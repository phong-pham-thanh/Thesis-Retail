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
using APIBackend.DataModel.Analyse;
using DocumentFormat.OpenXml.Packaging;
using Microsoft.AspNetCore.Hosting;

namespace APIBackend.Service
{
    public interface IBillService
    {
        public BillModel AddBill(BillModel billModel);
        public List<BillModel> GetAll();
        public List<BillModel> GetAllByDate(DateParam dateParam);
        public List<BillModel> GetAllByRole();
        public byte[] PrintBill(int id);
        // public List<BillModel> GetAllBills();
        // public BillModel GetBillById(int id);
        // public BillModel AcceptBill(int id);
    }

    public class BillService : IBillService
    {
        private readonly IProductMapper _productMapper;
        private readonly IBillMapper _billMapper;
        private readonly IBillDetailMapper _billDetailMapper;
        private readonly IBillRepository _billRepository;
        private readonly IBillDetailRepository _billDetailRepository;
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IProductRepository _productRepository;
        private readonly IGoodExportService _goodExportService;
        private readonly IUserRepository _userRepository;
        protected readonly IUnityOfWorkFactory _uowFactory;
        protected readonly IUserWareHouseService _userWareHouseService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IWareHouseRepository _wareHouseRepository;


        public BillService(
            IProductMapper productMapper,
            IBillMapper billMapper,
            IBillDetailMapper billDetailMapper,
            IBillRepository billRepository,
            IBillDetailRepository billDetailRepository,
            IInventoryRepository inventoryRepository,
            IProductRepository productRepository,
            IUserRepository userRepository,
            IUnityOfWorkFactory uowFactory,
            IUserWareHouseService userWareHouseService,
            IWebHostEnvironment webHostEnvironment,
            IWareHouseRepository wareHouseRepository,
            IGoodExportService goodExportService
        ) 
        {
            _productMapper = productMapper;
            _billMapper = billMapper;
            _billDetailMapper = billDetailMapper;
            _billRepository = billRepository;
            _billDetailRepository = billDetailRepository;
            _inventoryRepository = inventoryRepository;
            _productRepository = productRepository;
            _goodExportService = goodExportService;
            _userRepository = userRepository;
            _uowFactory = uowFactory;
            _userWareHouseService = userWareHouseService;
            _webHostEnvironment = webHostEnvironment;
            _wareHouseRepository = wareHouseRepository;
        }

        public List<BillModel> GetAll()
        {
            List<BillModel> result = _billRepository.GetAll();
            foreach (var item in result)
            {
                item.User = _userRepository.GetUserById(item.UserId);
            }
            return result;
        }

        public List<BillModel> GetAllByRole()
        {
            List<BillModel> result = _billRepository.GetAll();
            List<int> listIdWarehouseBelong = _userWareHouseService.GetListWareHouseCurrentUserBelong();
            result = result.Where(x => listIdWarehouseBelong.Contains(x.WareHouseId)).ToList();
            foreach (var item in result)
            {
                item.User = _userRepository.GetUserById(item.UserId);
            }
            return result;
        }

        public BillModel AddBill(BillModel billModel)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                //Add Bill
                BillModel newBillModel = _billRepository.AddBill(billModel);

                //Add Bill Details
                foreach (var billDetailModel in billModel.ListBillDetails)
                {
                    BillDetails billDetails = new BillDetails();
                    _billDetailMapper.ToEntity(billDetails, billDetailModel);
                    billDetails.BillId = newBillModel.Id;
                    _billDetailRepository.AddBillDetails(billDetails);
                }
                AutoAddGoodExport(billModel, billModel.ListBillDetails);
                uow.Commit();
                return newBillModel;
            }
        }

        public List<BillModel> GetAllByDate(DateParam dateParam)
        {
            return _billRepository.GetAllByDate(dateParam);
        }


        private void AutoAddGoodExport(BillModel billModel, List<BillDetailModel> listBillDetailModels)
        {
            GoodsExportModel goodsExportModel = new GoodsExportModel();
            goodsExportModel.CustomerId = billModel.CustomerId;
            goodsExportModel.WareHouseId = billModel.WareHouseId;
            goodsExportModel.ExportDate = billModel.CreatedDate;

            List<GoodExportDetailModel> listGoodExportDetailModels = new List<GoodExportDetailModel>();
            foreach(BillDetailModel billDetail in listBillDetailModels)
            {
                GoodExportDetailModel newItem = new GoodExportDetailModel();
                newItem.ProductId = billDetail.ProductId;
                newItem.Quantity = billDetail.Quantity;
                listGoodExportDetailModels.Add(newItem);
            }

            _goodExportService.AddGoodExport(goodsExportModel, listGoodExportDetailModels, autoAccept: true);
        }

        public byte[] PrintBill(int id)
        {
            BillModel noteModel = _billRepository.GetById(id);
            string folderPath = Path.Combine(_webHostEnvironment.WebRootPath, "template");
            string fileName = "BillTemplate.docx";
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
                        Utilities.ReplaceFieldWithId(mainPart, "DateNote", noteModel.CreatedDate.ToShortDateString());
                        Utilities.ReplaceFieldWithId(mainPart, "WareHouseName", _wareHouseRepository.GetById(noteModel.WareHouseId).Address);
                        Utilities.ReplaceFieldWithId(mainPart, "TotalAmount", noteModel.TotalAmount.ToString("N0"));
                        Utilities.ReplaceFieldWithId(mainPart, "CustomerName", noteModel.Customer?.Name != null ? noteModel.Customer?.Name : "Khách lẻ");
                        foreach (var item in noteModel.ListBillDetails)
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
    }
}