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

namespace APIBackend.Service
{
    public interface IGoodTransferService
    {
        public bool AddGoodTransfer(GoodsTransferModel goodsTransferModel, List<GoodTransferDetailModel> listGoodTransferDetailModels, bool autoAccept);
        public List<GoodsTransferModel> GetAllGoodTransfers();
        public List<GoodsTransferModel> GetAllGoodTransfersByRole();
        public GoodsTransferModel GetGoodTransferById(int id);
        public GoodsTransferModel AcceptGoodTransfer(int id);
        public GoodsTransferModel UpdateGoodTransfer(int id, GoodsTransferModel updateItem);
        public GoodsTransferModel CancelGoodTransfer(int id);
        public byte[] PrintGoodTransfer(int id);
        public bool RemoveGoodTransfer(int id);
    }
    public class GoodTransferService : IGoodTransferService
    {
        private readonly IProductMapper _productMapper;
        private readonly IGoodsTransferMapper _goodTransferMapper;
        private readonly IGoodTransferDetailMapper _goodTransferDetailMapper;
        private readonly IGoodTransferRepository _goodTransferRepository;
        private readonly IGoodTransferDetailRepository _goodTransferDetailRepository;
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IProductRepository _productRepository;
        protected readonly IUnityOfWorkFactory _uowFactory;
        private readonly IGoodExportService _goodExportService;
        private readonly IGoodReciptService _goodReciptService;
        private readonly IUserService _userService;
        private readonly IUserSessionService _userSessionService;
        private readonly IUserWareHouseService _userWareHouseService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public GoodTransferService(IProductMapper productMapper,
            IGoodsTransferMapper goodTransferMapper,
            IGoodTransferDetailMapper goodTransferDetailMapper,
            IGoodTransferRepository goodTransferRepository,
            IGoodTransferDetailRepository goodTransferDetailRepository,
            IInventoryRepository inventoryRepository,
            IProductRepository productRepository,
            IGoodExportService goodExportService,
            IGoodReciptService goodReciptService,
            IUserService userService,
            IUnityOfWorkFactory uowFactory,
            IUserWareHouseService userWareHouseService,
            IWebHostEnvironment webHostEnvironment,
            IUserSessionService userSessionService)
        {
            _productMapper = productMapper;
            _goodTransferMapper = goodTransferMapper;
            _goodTransferDetailMapper = goodTransferDetailMapper;
            _goodTransferRepository = goodTransferRepository;
            _goodTransferDetailRepository = goodTransferDetailRepository;
            _inventoryRepository = inventoryRepository;
            _productRepository = productRepository;
            _goodExportService = goodExportService;
            _goodReciptService = goodReciptService;
            _userService = userService;
            _uowFactory = uowFactory;
            _userSessionService = userSessionService;
            _webHostEnvironment = webHostEnvironment;
            _userWareHouseService = userWareHouseService;
        }

        public bool AddGoodTransfer(GoodsTransferModel goodsTransferModel, List<GoodTransferDetailModel> listGoodTransferDetailModels, bool autoAccept)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                //Add good Transfer
                GoodsTransfer goodsTransfer = new GoodsTransfer();

                if (!autoAccept)
                {
                    goodsTransferModel.Status = Status.Process;
                }
                else
                {
                    goodsTransferModel.Status = Status.Success;
                }

                _goodTransferMapper.ToEntity(goodsTransfer, goodsTransferModel);
                GoodsTransferModel newGoodTransferModel = _goodTransferMapper.ToModel(_goodTransferRepository.AddGoodTransfer(goodsTransfer));


                //Add Good Transfer Details
                foreach (var goodTransferDetailModel in listGoodTransferDetailModels)
                {
                    GoodTransferDetails goodTransferDetails = new GoodTransferDetails();
                    _goodTransferDetailMapper.ToEntity(goodTransferDetails, goodTransferDetailModel);
                    goodTransferDetails.GoodTransferId = newGoodTransferModel.Id;
                    _goodTransferDetailRepository.AddGoodTransferDetails(goodTransferDetails);
                }

                if (autoAccept)
                {
                    GoodsTransferModel newGoodTransferModelWithFullDetails = _goodTransferRepository.GetGoodTransferById(newGoodTransferModel.Id);
                    // UpdateInventoryForGoodTransfer(newGoodTransferModelWithFullDetails);
                }
                uow.Commit();
            }

            return true;
        }

        public GoodsTransferModel UpdateGoodTransfer(int id, GoodsTransferModel updateItem)
        {
            GoodsTransferModel result = new GoodsTransferModel();
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                result = _goodTransferRepository.UpdateGoodTransfer(id, updateItem);
                _goodTransferDetailRepository.DeleteListGoodTransferDetailByGoodTransferId(updateItem.Id);
                _goodTransferDetailRepository.AddListGoodTransferDetails(updateItem.ListGoodTransferDetailsModel);
                uow.Commit();
            }
            return result;
        }

        public GoodsTransferModel GetGoodTransferById(int id)
        {
            GoodsTransferModel result = _goodTransferRepository.GetGoodTransferById(id);
            foreach (GoodTransferDetailModel detail in result.ListGoodTransferDetailsModel)
            {
                detail.Product = _productRepository.GetProductById(detail.ProductId);
            }
            return result;
        }

        public List<GoodsTransferModel> GetAllGoodTransfers()
        {
            List<GoodsTransferModel> listGoodTransfer = _goodTransferRepository.GetAllGoodTransfers();
            foreach (GoodsTransferModel item in listGoodTransfer)
            {
                foreach (GoodTransferDetailModel detail in item.ListGoodTransferDetailsModel)
                {
                    detail.Product = _productRepository.GetProductById(detail.ProductId);
                }
                item.User = _userService.GetById(item.UserId);
            }
            listGoodTransfer = listGoodTransfer.OrderByDescending(g => g.Status).ToList();
            return listGoodTransfer;
        }

        public List<GoodsTransferModel> GetAllGoodTransfersByRole()
        {
            List<int> listIdWareHouseBelong = _userWareHouseService.GetListWareHouseCurrentUserBelong();
            List<GoodsTransferModel> listGoodTransfer = _goodTransferRepository.GetAllGoodTransfers();
            listGoodTransfer = listGoodTransfer.Where(x => listIdWareHouseBelong.Contains(x.ToWareHouseId) || listIdWareHouseBelong.Contains(x.FromWareHouseId)).ToList();
            foreach (GoodsTransferModel item in listGoodTransfer)
            {
                foreach (GoodTransferDetailModel detail in item.ListGoodTransferDetailsModel)
                {
                    detail.Product = _productRepository.GetProductById(detail.ProductId);
                }
                item.User = _userService.GetById(item.UserId);
            }
            listGoodTransfer = listGoodTransfer.OrderByDescending(g => g.Status).ToList();
            return listGoodTransfer;
        }

        public GoodsTransferModel AcceptGoodTransfer(int id)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                GoodsTransferModel result = _goodTransferRepository.AcceptGoodTransfer(id, _userSessionService.GetCurrentUser().Id);
                //UpdateInventoryForGoodTransfer(result);
                GoodsExportModel exportModel = this.BuildGoodExportFromTransfer(result);
                _goodExportService.AddGoodExport(exportModel, exportModel.ListGoodExportDetailsModel, autoAccept: true);


                GoodsReceiptModel receiptModel = this.BuildGoodReceiptFromTransfer(result);
                _goodReciptService.AddGoodRecipt(receiptModel, receiptModel.ListGoodReciptDetailsModel, autoAccept: false);


                uow.Commit();
                return result;
            }
        }

        private GoodsReceiptModel BuildGoodReceiptFromTransfer(GoodsTransferModel goodsTransferModel)
        {
            GoodsReceiptModel result = new GoodsReceiptModel
            {
                Id = 0,
                ReceiptStatus = Status.Success,
                ImportDate = DateTime.Now,
                WareHouseId = goodsTransferModel.ToWareHouseId,
                ListGoodReciptDetailsModel = new List<GoodReceiptDetailModel>(),
            };
            foreach (GoodTransferDetailModel item in goodsTransferModel.ListGoodTransferDetailsModel)
            {
                result.ListGoodReciptDetailsModel.Add(new GoodReceiptDetailModel
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                });
            }
            return result;
        }

        private GoodsExportModel BuildGoodExportFromTransfer(GoodsTransferModel goodsTransferModel)
        {
            GoodsExportModel result = new GoodsExportModel
            {
                Id = 0,
                ExportStatus = Status.Success,
                ExportDate = DateTime.Now,
                WareHouseId = goodsTransferModel.FromWareHouseId,
                ListGoodExportDetailsModel = new List<GoodExportDetailModel>(),
            };
            foreach (GoodTransferDetailModel item in goodsTransferModel.ListGoodTransferDetailsModel)
            {
                result.ListGoodExportDetailsModel.Add(new GoodExportDetailModel
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                });
            }
            return result;
        }

        public GoodsTransferModel CancelGoodTransfer(int id)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                GoodsTransferModel result = _goodTransferRepository.CancelGoodTransfer(id, _userSessionService.GetCurrentUser().Id);
                uow.Commit();
                return result;
            }
        }

        
        public bool RemoveGoodTransfer(int id)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                _goodTransferDetailRepository.DeleteListGoodTransferDetailByGoodTransferId(id);
                _goodTransferRepository.RemoveGoodTransfer(id);
                uow.Commit();
            }

            return true;
        }


        public byte[] PrintGoodTransfer(int id)
        {
            GoodsTransferModel noteModel = _goodTransferRepository.GetGoodTransferById(id);
            string folderPath = Path.Combine(_webHostEnvironment.WebRootPath, "template");
            string fileName = "TransferTemplate.docx";
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
                        Utilities.ReplaceFieldWithId(mainPart, "DateNote", noteModel.TransferDate.ToShortDateString());
                        Utilities.ReplaceFieldWithId(mainPart, "FromWareHouse", noteModel.FromWareHouse?.Address);
                        Utilities.ReplaceFieldWithId(mainPart, "ToWareHouse", noteModel.ToWareHouse?.Address.ToString());
                        Utilities.ReplaceFieldWithId(mainPart, "Status", noteModel.Status.ToString());
                        foreach (var item in noteModel.ListGoodTransferDetailsModel)
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
    }
}
