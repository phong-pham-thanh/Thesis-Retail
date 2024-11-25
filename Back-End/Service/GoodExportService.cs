using APIBackEnd.Data;
using APIBackend.Models;
using APIBackend.Mapper;
using APIBackEnd.Mapper;
using APIBackend.DataModel;
using APIBackend.Repository;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using APIBackEnd.Data.Enum;
using NGO.Core.Repositories;
using DocumentFormat.OpenXml.Packaging;
using APIBackend.DataModel.Analyse;

namespace APIBackend.Service
{
    public interface IGoodExportService
    {
        public bool AddGoodExport(GoodsExportModel goodsExportModel, List<GoodExportDetailModel> listGoodExportDetailModels, bool autoAccept);
        public List<GoodsExportModel> GetAllGoodExports();
        public List<GoodsExportModel> GetAllGoodExportsByRole();
        public GoodsExportModel GetGoodExportById(int id);
        public GoodsExportModel AcceptGoodExport(int id);
        public GoodsExportModel UpdateGoodExport(int id, GoodsExportModel updateItem);
        public byte[] PrintGoodExport(int id);
        public List<GoodsExportModel> GetAllGoodExportByDate(DateParam dateParam);
    }
    public class GoodExportService : IGoodExportService
    {
        private readonly IProductMapper _productMapper;
        private readonly IWareHouseRepository _wareHouseRepository;
        private readonly IGoodsExportMapper _goodExportMapper;
        private readonly IGoodExportDetailMapper _goodExportDetailMapper;
        private readonly IGoodExportRepository _goodExportRepository;
        private readonly IGoodExportDetailRepository _goodExportDetailRepository;
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IProductRepository _productRepository;
        protected readonly IUnityOfWorkFactory _uowFactory;
        private readonly IUserSessionService _userSessionService;
        private readonly IUserWareHouseService _userWareHouseService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public GoodExportService(IProductMapper productMapper, 
            IGoodsExportMapper goodExportMapper,
            IWareHouseRepository wareHouseRepository,
            IGoodExportDetailMapper goodExportDetailMapper, 
            IGoodExportRepository goodExportRepository,
            IGoodExportDetailRepository goodExportDetailRepository,
            IInventoryRepository inventoryRepository,
            IProductRepository productRepository,
            IUnityOfWorkFactory uowFactory,
            IUserWareHouseService userWareHouseService,
            IWebHostEnvironment webHostEnvironment,
            IUserSessionService userSessionService)
        {
            _productMapper = productMapper;
            _wareHouseRepository = wareHouseRepository;
            _goodExportMapper = goodExportMapper;
            _goodExportDetailMapper = goodExportDetailMapper;
            _goodExportRepository = goodExportRepository;
            _goodExportDetailRepository = goodExportDetailRepository;
            _inventoryRepository = inventoryRepository;
            _productRepository = productRepository;
            _uowFactory = uowFactory;
            _userSessionService = userSessionService;
            _userWareHouseService = userWareHouseService;
            _webHostEnvironment = webHostEnvironment;
        }

        public bool AddGoodExport(GoodsExportModel goodsExportModel, List<GoodExportDetailModel> listGoodExportDetailModels, bool autoAccept)
        {
            using(var uow = _uowFactory.CreateUnityOfWork())
            {
                //Add good Export
                GoodsExport goodsExport = new GoodsExport();

                if (!autoAccept)
                {
                    goodsExportModel.ExportStatus = Status.Process;
                }
                else
                {
                    goodsExportModel.ExportStatus = Status.Success;
                }

                _goodExportMapper.ToEntity(goodsExport, goodsExportModel);
                GoodsExportModel newGoodExportModel = _goodExportMapper.ToModel(_goodExportRepository.AddGoodExport(goodsExport));


                //Add Good Export Details
                foreach (var goodExportDetailModel in listGoodExportDetailModels)
                {
                    GoodExportDetails goodExportDetails = new GoodExportDetails();
                    _goodExportDetailMapper.ToEntity(goodExportDetails, goodExportDetailModel);
                    goodExportDetails.GoodExportId = newGoodExportModel.Id;
                    _goodExportDetailRepository.AddGoodExportDetails(goodExportDetails);
                }

                if (autoAccept)
                {
                    GoodsExportModel newGoodExportModelWithFullDetails = _goodExportRepository.GetGoodExportById(newGoodExportModel.Id);
                    UpdateInventoryForGoodExport(newGoodExportModelWithFullDetails);
                }
                uow.Commit();
            }
            
            return true;
        }

        public GoodsExportModel UpdateGoodExport(int id, GoodsExportModel updateItem)
        {
            GoodsExportModel result = new GoodsExportModel();
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                result = _goodExportRepository.UpdateGoodExport(id, updateItem);

                _goodExportDetailRepository.DeleteListGoodExportDetailByGoodExportId(updateItem.Id);
                _goodExportDetailRepository.AddListGoodExportDetails(updateItem.ListGoodExportDetailsModel);
                uow.Commit();
            }
            return result;
        }

        public GoodsExportModel GetGoodExportById(int id)
        {
            GoodsExportModel result = _goodExportRepository.GetGoodExportById(id);
            foreach(GoodExportDetailModel detail in result.ListGoodExportDetailsModel)
            {
                detail.Product = _productRepository.GetProductById(detail.ProductId);
            }
            return result;
        }

        public List<GoodsExportModel> GetAllGoodExports()
        {
            List<GoodsExportModel> listGoodExport = _goodExportRepository.GetAllGoodExports();
            listGoodExport = listGoodExport.OrderByDescending(x => x.ExportStatus).ToList();
            bindWareHouseToGoodNote(listGoodExport);
            return listGoodExport;
        }

        public List<GoodsExportModel> GetAllGoodExportsByRole()
        {
            List<GoodsExportModel> listGoodExport = _goodExportRepository.GetAllGoodExports();
            List<int> listIdWareHouseBelong = _userWareHouseService.GetListWareHouseCurrentUserBelong();
            listGoodExport = listGoodExport.Where(x => listIdWareHouseBelong.Contains(x.WareHouseId)).ToList();
            listGoodExport = listGoodExport.OrderByDescending(x => x.ExportStatus).ToList();
            bindWareHouseToGoodNote(listGoodExport);
            return listGoodExport;
        }

        public GoodsExportModel AcceptGoodExport(int id)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                GoodsExportModel result = _goodExportRepository.AcceptGoodExport(id);
                UpdateInventoryForGoodExport(result);
                uow.Commit();
                return result;
            }
        }

        public void UpdateInventoryForGoodExport(GoodsExportModel currentGoodExport)
        {
            foreach(var goodExportDetailModel in currentGoodExport.ListGoodExportDetailsModel)
            {
                _inventoryRepository.UpdateInventory(goodExportDetailModel.ProductId, goodExportDetailModel.Quantity, currentGoodExport.WareHouseId, false);
            }
        }

        public void bindWareHouseToGoodNote(List<GoodsExportModel> listGoodExport)
        {
            foreach(GoodsExportModel item in listGoodExport)
            {
                item.WareHouse = _wareHouseRepository.GetById(item.WareHouseId);
            }
        }

        public byte[] PrintGoodExport(int id)
        {
            GoodsExportModel noteModel = _goodExportRepository.GetGoodExportById(id);
            string folderPath = Path.Combine(_webHostEnvironment.WebRootPath, "template");
            string fileName = "ExportTemplate.docx";
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
                        Utilities.ReplaceFieldWithId(mainPart, "DateNote", noteModel.ExportDate.ToShortDateString());
                        Utilities.ReplaceFieldWithId(mainPart, "WareHouseName", _wareHouseRepository.GetById(noteModel.WareHouseId).Address);
                        Utilities.ReplaceFieldWithId(mainPart, "CustomerName", noteModel.Customer?.Name != null ? noteModel.Customer?.Name : "");
                        Utilities.ReplaceFieldWithId(mainPart, "Status", noteModel.ExportStatus.ToString());
                        foreach(var item in noteModel.ListGoodExportDetailsModel)
                        {
                            string productName = _productRepository.GetProductById(item.ProductId).Name;
                            Utilities.AddRowToBookmarkTableReceiptExport(mainPart, "dataTable", productName, item.Quantity);
                        }
                        mainPart.Document.Save();
                    }
                }
                memoryStream.Position = 0;
                return memoryStream.ToArray();
            }
        }
        
        public List<GoodsExportModel> GetAllGoodExportByDate(DateParam dateParam)
        {
            return _goodExportRepository.GetAllGoodExportByDate(dateParam);
        }
    }
}
