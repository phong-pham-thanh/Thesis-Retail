using APIBackEnd.Data;
using APIBackend.Models;
using APIBackend.Mapper;
using APIBackEnd.Mapper;
using APIBackend.DataModel;
using APIBackend.Repository;
using APIBackEnd.Models;
using APIBackEnd.Repository;

namespace APIBackend.Service
{
    public interface IGoodExportService
    {
        public bool AddGoodExport(GoodsExportModel goodsExportModel, List<GoodExportDetailModel> listGoodExportDetailModels, int idWareHouse);
        public List<GoodsExportModel> GetAllGoodExports();
        public GoodsExportModel GetGoodExportById(int id);
    }
    public class GoodExportService : IGoodExportService
    {
        private readonly IProductMapper _productMapper;
        private readonly IGoodsExportMapper _goodExportMapper;
        private readonly IGoodExportDetailMapper _goodExportDetailMapper;
        private readonly IGoodExportRepository _goodExportRepository;
        private readonly IGoodExportDetailRepository _goodExportDetailRepository;
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IProductRepository _productRepository;

        public GoodExportService(IProductMapper productMapper, 
            IGoodsExportMapper goodExportMapper, 
            IGoodExportDetailMapper goodExportDetailMapper, 
            IGoodExportRepository goodExportRepository,
            IGoodExportDetailRepository goodExportDetailRepository,
            IInventoryRepository inventoryRepository,
            IProductRepository productRepository)
        {
            _productMapper = productMapper;
            _goodExportMapper = goodExportMapper;
            _goodExportDetailMapper = goodExportDetailMapper;
            _goodExportRepository = goodExportRepository;
            _goodExportDetailRepository = goodExportDetailRepository;
            _inventoryRepository = inventoryRepository;
            _productRepository = productRepository;
        }

        public bool AddGoodExport(GoodsExportModel goodsExportModel, List<GoodExportDetailModel> listGoodExportDetailModels, int idWareHouse)
        {
            //Add good Export
            GoodsExport goodsExport = new GoodsExport();
            _goodExportMapper.ToEntity(goodsExport, goodsExportModel);
            GoodsExportModel newGoodExportModel = _goodExportMapper.ToModel(_goodExportRepository.AddGoodExport(goodsExport));


            //Add Good Export Details
            foreach(var goodExportDetailModel in listGoodExportDetailModels)
            {
                GoodExportDetails goodExportDetails = new GoodExportDetails();
                _goodExportDetailMapper.ToEntity(goodExportDetails, goodExportDetailModel);
                goodExportDetails.GoodExportId = newGoodExportModel.Id;
                _goodExportDetailRepository.AddGoodExportDetails(goodExportDetails);

                //Update Inventory in ware house
                _inventoryRepository.UpdateInventory(goodExportDetailModel.ProductId, goodExportDetailModel.Quantity, idWareHouse, false);
            }
            

            return true;
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
            return listGoodExport;
        }
    }
}
