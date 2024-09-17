using APIBackEnd.Data;
using APIBackend.Models;
using APIBackend.Mapper;
using APIBackEnd.Mapper;
using APIBackend.DataModel;
using APIBackend.Repository;
using APIBackEnd.Models;

namespace APIBackend.Service
{
    public interface IGoodExportService
    {
        public bool AddGoodExport(GoodsExportModel goodsExportModel, List<GoodExportDetailModel> listGoodExportDetailModels, int idWareHouse);
        public List<GoodsExportModel> GetAllGoodExports();
    }
    public class GoodExportService : IGoodExportService
    {
        private readonly IProductMapper _productMapper;
        private readonly IGoodsExportMapper _goodExportMapper;
        private readonly IGoodExportDetailMapper _goodExportDetailMapper;
        private readonly IGoodExportRepository _goodExportRepository;
        private readonly IGoodExportDetailRepository _goodExportDetailRepository;
        private readonly IInventoryRepository _inventoryRepository;

        public GoodExportService(IProductMapper productMapper, 
            IGoodsExportMapper goodExportMapper, 
            IGoodExportDetailMapper goodExportDetailMapper, 
            IGoodExportRepository goodExportRepository,
            IGoodExportDetailRepository goodExportDetailRepository,
            IInventoryRepository inventoryRepository)
        {
            _productMapper = productMapper;
            _goodExportMapper = goodExportMapper;
            _goodExportDetailMapper = goodExportDetailMapper;
            _goodExportRepository = goodExportRepository;
            _goodExportDetailRepository = goodExportDetailRepository;
            _inventoryRepository = inventoryRepository;
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

        public List<GoodsExportModel> GetAllGoodExports()
        {
            List<GoodsExportModel> listGoodExport = _goodExportMapper.ToModels(_goodExportRepository.GetAllGoodExports());
            return listGoodExport;
        }
    }
}
