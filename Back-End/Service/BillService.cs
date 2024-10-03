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

namespace APIBackend.Service
{
    public interface IBillService
    {
        public bool AddBill(BillModel billModel);
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
        protected readonly IUnityOfWorkFactory _uowFactory;


        public BillService(
            IProductMapper productMapper,
            IBillMapper billMapper,
            IBillDetailMapper billDetailMapper,
            IBillRepository billRepository,
            IBillDetailRepository billDetailRepository,
            IInventoryRepository inventoryRepository,
            IProductRepository productRepository,
            IUnityOfWorkFactory uowFactory,
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
            _uowFactory = uowFactory;
        }
        public bool AddBill(BillModel billModel)
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
                return true;
            }
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

            _goodExportService.AddGoodExport(goodsExportModel, listGoodExportDetailModels, goodsExportModel.WareHouseId, autoAccept: true);
        }

    }
}