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

namespace APIBackend.Service
{
    public interface IBillService
    {
        public bool AddBill(BillModel billModel);
        public List<BillModel> GetAll();
        public List<BillModel> GetAllByDate(DateParam dateParam);
        public List<BillModel> GetAllByRole();
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

    }
}