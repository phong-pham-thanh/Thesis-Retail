using APIBackend.DataModel;
using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace APIBackend.Repository
{
    public interface IGoodExportRepository
    {
        public GoodsExport AddGoodExport(GoodsExport goodsExport);
        public List<GoodsExportModel> GetAllGoodExports();
        public GoodsExportModel GetGoodExportById(int id);
    }
    public class GoodExportRepository : IGoodExportRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IProductMapper _productMapper;
        private readonly IGoodsExportMapper _goodExportMapper;
        private readonly IGoodExportDetailMapper _goodExportDetailMapper;

        public GoodExportRepository(CoreContext _context, IProductMapper productMapper, IGoodsExportMapper goodExportMapper, IGoodExportDetailMapper goodExportDetailMapper)
        {
            _coreContext = _context;
            _productMapper = productMapper;
            _goodExportMapper = goodExportMapper;
            _goodExportDetailMapper = goodExportDetailMapper;
        }

        public GoodsExport AddGoodExport(GoodsExport goodsExport)
        {
            _coreContext.GoodsExports.Add(goodsExport);
            _coreContext.SaveChanges();
            return goodsExport;
        }

        public GoodsExportModel GetGoodExportById(int id)
        {
            return _goodExportMapper.ToModel(_coreContext.GoodsExports.Include(go => go.Customer)
                                            .Include(go => go.ListGoodExportDetails)
                                            .Where(go => go.Id == id).FirstOrDefault());
        }

        public List<GoodsExportModel> GetAllGoodExports()
        {
            List<GoodsExport> listGoodExports= new List<GoodsExport>();
            listGoodExports = _coreContext.GoodsExports
                                            .Include(go => go.Customer)
                                            .Include(go => go.ListGoodExportDetails).ToList();
            return _goodExportMapper.ToModels(listGoodExports);
        }
    }
}
