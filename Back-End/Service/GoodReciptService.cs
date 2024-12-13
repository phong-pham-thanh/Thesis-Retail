using APIBackEnd.Data;
using APIBackend.Models;
using APIBackend.Mapper;
using APIBackEnd.Mapper;
using APIBackend.DataModel;
using APIBackend.Repository;
using APIBackEnd.Repository;
using NGO.Core.Repositories;
using APIBackEnd.Data.Enum;
using APIBackEnd.Models;
using DocumentFormat.OpenXml.Packaging;
using APIBackend.DataModel.Analyse;
namespace APIBackend.Service
{
    public interface IGoodReciptService
    {
        public bool AddGoodRecipt(GoodsReceiptModel goodsReceiptModel, List<GoodReceiptDetailModel> listGoodReceiptDetailModels, bool autoAccept);
        public List<GoodsReceiptModel> GetAllGoodRecipts();
        public List<GoodsReceiptModel> GetAllGoodReciptsByRole();
        public GoodsReceiptModel GetGoodReciptById(int id);
        public GoodsReceiptModel AcceptGoodReceipt(int id);
        public GoodsReceiptModel CancelGoodRecipt(int id);
        public GoodsReceiptModel UpdateGoodReceipt(int id, GoodsReceiptModel updateItem);
        public byte[] PrintGoodReceipt(int id);
        public List<GoodsReceiptModel> GetAllGoodReciptsByDate(DateParam dateParam);
        public bool RemoveGoodReceipt(int id);
    }
    public class GoodReciptService : IGoodReciptService
    {
        private readonly IProductMapper _productMapper;
        private readonly IGoodsReceiptMapper _goodReciptMapper;
        private readonly IGoodReciptDetailMapper _goodReciptDetailMapper;
        private readonly IGoodReciptRepository _goodReciptRepository;
        private readonly IGoodReciptDetailRepository _goodReciptDetailRepository;
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IProductRepository _productRepository;
        protected readonly IUnityOfWorkFactory _uowFactory;
        private readonly IUserSessionService _userSessionService;
        private readonly IUserWareHouseService _userWareHouseService;
        private readonly IWareHouseRepository _wareHouseRepository;
        private readonly string _baseUrl;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public GoodReciptService(IProductMapper productMapper,
            IGoodsReceiptMapper goodReciptMapper,
            IGoodReciptDetailMapper goodReciptDetailMapper,
            IGoodReciptRepository goodReciptRepository,
            IGoodReciptDetailRepository goodReciptDetailRepository,
            IInventoryRepository inventoryRepository,
            IProductRepository productRepository,
            IUnityOfWorkFactory uowFactory,
            IUserWareHouseService userWareHouseService,
            IConfiguration configuration,
            IWareHouseRepository wareHouseRepository,
            IWebHostEnvironment webHostEnvironment,
            IUserSessionService userSessionService)
        {
            _productMapper = productMapper;
            _goodReciptMapper = goodReciptMapper;
            _goodReciptDetailMapper = goodReciptDetailMapper;
            _goodReciptRepository = goodReciptRepository;
            _goodReciptDetailRepository = goodReciptDetailRepository;
            _inventoryRepository = inventoryRepository;
            _productRepository = productRepository;
            _uowFactory = uowFactory;
            _userSessionService = userSessionService;
            _userWareHouseService = userWareHouseService;
            _wareHouseRepository = wareHouseRepository;
            _baseUrl = configuration["ImageSettings:WebUrl"];
            _webHostEnvironment = webHostEnvironment;

        }

        public bool AddGoodRecipt(GoodsReceiptModel goodsReceiptModel, List<GoodReceiptDetailModel> listGoodReceiptDetailModels, bool autoAccept)
        {
            //Add good recipt
            GoodsReceipt goodsReceipt = new GoodsReceipt();
            goodsReceiptModel.CreatedById = _userSessionService.GetCurrentUser().Id;
            if (!autoAccept)
            {
                goodsReceiptModel.ReceiptStatus = Status.Process;
            }
            else
            {
                goodsReceiptModel.ReceiptStatus = Status.Success;
                goodsReceiptModel.AcceptedById = _userSessionService.GetCurrentUser().Id;
            }
            goodsReceiptModel.TotalAmount = this.CaculateTotalAmount(listGoodReceiptDetailModels);
            _goodReciptMapper.ToEntity(goodsReceipt, goodsReceiptModel);

            GoodsReceiptModel newGoodReciptModel = _goodReciptMapper.ToModel(_goodReciptRepository.AddGoodRecipt(goodsReceipt));


            //Add Good Recipt Details
            foreach (var goodReceiptDetailModel in listGoodReceiptDetailModels)
            {
                GoodReceiptDetails goodReciptDetails = new GoodReceiptDetails();
                _goodReciptDetailMapper.ToEntity(goodReciptDetails, goodReceiptDetailModel);
                goodReciptDetails.GoodReceiptId = newGoodReciptModel.Id;
                _goodReciptDetailRepository.AddGoodReciptDetails(goodReciptDetails);
            }
            if (autoAccept)
            {
                GoodsReceiptModel newGoodReceiptModelWithFullDetails = _goodReciptRepository.GetGoodReciptById(newGoodReciptModel.Id);
                UpdateInventoryForGoodRecipt(newGoodReceiptModelWithFullDetails);
            }

            return true;
        }

        public List<GoodsReceiptModel> GetAllGoodRecipts()
        {
            List<GoodsReceiptModel> result = _goodReciptRepository.GetAllGoodRecipts();
            result = result.OrderByDescending(x => x.ReceiptStatus).ToList();
            bindWareHouseToGoodNote(result);
            return result;
        }

        public List<GoodsReceiptModel> GetAllGoodReciptsByRole()
        {
            List<GoodsReceiptModel> result = _goodReciptRepository.GetAllGoodRecipts();
            List<int> listIdWareHouseBelong = _userWareHouseService.GetListWareHouseCurrentUserBelong();
            result = result.Where(x => listIdWareHouseBelong.Contains(x.WareHouseId)).ToList();
            result = result.OrderByDescending(x => x.ReceiptStatus).ToList();
            bindWareHouseToGoodNote(result);
            return result;
        }

        public GoodsReceiptModel GetGoodReciptById(int id)
        {
            GoodsReceiptModel result = _goodReciptRepository.GetGoodReciptById(id);
            if (result == null) return null;

            foreach (GoodReceiptDetailModel item in result.ListGoodReciptDetailsModel)
            {
                item.Product = _productRepository.GetProductById(item.ProductId);
            }
            return result;
        }

        public GoodsReceiptModel AcceptGoodReceipt(int id)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                GoodsReceiptModel result = _goodReciptRepository.AcceptGoodRecipt(id, _userSessionService.GetCurrentUser().Id);
                UpdateInventoryForGoodRecipt(result);
                uow.Commit();
                return result;
            }
        }

        public GoodsReceiptModel CancelGoodRecipt(int id)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                GoodsReceiptModel result = _goodReciptRepository.CancelGoodRecipt(id, _userSessionService.GetCurrentUser().Id);
                uow.Commit();
                return result;
            }
        }

        public void UpdateInventoryForGoodRecipt(GoodsReceiptModel currentGoodReceipt)
        {
            foreach (var goodReceiptDetailModel in currentGoodReceipt.ListGoodReciptDetailsModel)
            {
                _inventoryRepository.UpdateInventory(goodReceiptDetailModel.ProductId, goodReceiptDetailModel.Quantity, currentGoodReceipt.WareHouseId, true);
            }
        }

        public GoodsReceiptModel UpdateGoodReceipt(int id, GoodsReceiptModel updateItem)
        {
            GoodsReceiptModel result = new GoodsReceiptModel();
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                updateItem.TotalAmount = this.CaculateTotalAmount(updateItem.ListGoodReciptDetailsModel);
                result = _goodReciptRepository.UpdateGoodReceipt(id, updateItem);
                _goodReciptDetailRepository.DeleteListGoodReceiptDetailByGoodReceiptId(updateItem.Id);
                _goodReciptDetailRepository.AddListGoodReceiptDetails(updateItem.ListGoodReciptDetailsModel);

                uow.Commit();
            }
            return result;
        }


        private long CaculateTotalAmount(List<GoodReceiptDetailModel> listGoodReceiptDetailModels)
        {
            long totalAmount = 0;
            foreach (GoodReceiptDetailModel goodReceiptDetailModel in listGoodReceiptDetailModels)
            {
                int priceUnit = goodReceiptDetailModel.PriceUnit != null ? goodReceiptDetailModel.PriceUnit.Value : 0;
                totalAmount += priceUnit * goodReceiptDetailModel.Quantity;
            }
            return totalAmount;
        }

        public void bindWareHouseToGoodNote(List<GoodsReceiptModel> listGoodReceipt)
        {
            foreach (GoodsReceiptModel item in listGoodReceipt)
            {
                item.WareHouse = _wareHouseRepository.GetById(item.WareHouseId);
            }
        }

        public bool RemoveGoodReceipt(int id)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                _goodReciptDetailRepository.DeleteListGoodReceiptDetailByGoodReceiptId(id);
                _goodReciptRepository.RemoveGoodReceipt(id);
                uow.Commit();
            }

            return true;
        }

        public byte[] PrintGoodReceipt(int id)
        {
            GoodsReceiptModel noteModel = _goodReciptRepository.GetGoodReciptById(id);
            string folderPath = Path.Combine(_webHostEnvironment.WebRootPath, "template");
            string fileName = "ImportTemplate.docx";
            string filePath = Path.Combine(folderPath, fileName);
            using (var memoryStream = new MemoryStream())
            {
                using (var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                {
                    fileStream.CopyTo(memoryStream);
                }

                using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(memoryStream, true))
                {
                    var mainPart = wordDoc.MainDocumentPart;
                    if (mainPart != null)
                    {
                        Utilities.ReplaceFieldWithId(mainPart, "Id", id.ToString());
                        Utilities.ReplaceFieldWithId(mainPart, "DateNote", noteModel.ImportDate.ToShortDateString());
                        Utilities.ReplaceFieldWithId(mainPart, "WareHouseName", _wareHouseRepository.GetById(noteModel.WareHouseId).Address);
                        Utilities.ReplaceFieldWithId(mainPart, "PartnerName", noteModel.Partner?.Name);
                        Utilities.ReplaceFieldWithId(mainPart, "Status", noteModel.ReceiptStatus.ToString());
                        foreach(var item in noteModel.ListGoodReciptDetailsModel)
                        {
                            string productName = _productRepository.GetProductById(item.ProductId).Name;
                            Utilities.AddRowToBookmarkTableReceipt(mainPart, "dataTable", productName, item.Quantity, item.PriceUnit, item.Quantity * item.PriceUnit);
                        }
                        mainPart.Document.Save();
                    }
                }
                memoryStream.Position = 0;
                return memoryStream.ToArray();
            }
        }
        public List<GoodsReceiptModel> GetAllGoodReciptsByDate(DateParam dateParam)
        {
            return _goodReciptRepository.GetAllGoodReciptsByDate(dateParam);
        }
    }
}
