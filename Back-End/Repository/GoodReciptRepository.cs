using APIBackend.DataModel;
using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using Microsoft.EntityFrameworkCore;

namespace APIBackend.Repository
{
    public interface IGoodReciptRepository
    {
        public GoodsReceipt AddGoodRecipt(GoodsReceipt goodsReceip);
        public List<GoodsReceiptModel> GetAllGoodRecipts();
        public GoodsReceiptModel? GetGoodReciptById(int id);
    }
    public class GoodsReciptRepository : IGoodReciptRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IProductMapper _productMapper;
        private readonly IGoodsReceiptMapper _goodReciptMapper;
        private readonly IGoodReciptDetailMapper _goodReciptDetailMapper;

        public GoodsReciptRepository(CoreContext _context, IProductMapper productMapper, IGoodsReceiptMapper goodReciptMapper, IGoodReciptDetailMapper goodReciptDetailMapper)
        {
            _coreContext = _context;
            _productMapper = productMapper;
            _goodReciptMapper = goodReciptMapper;
            _goodReciptDetailMapper = goodReciptDetailMapper;
        }

        public GoodsReceipt AddGoodRecipt(GoodsReceipt goodsReceipt)
        {
            _coreContext.GoodsReceipt.Add(goodsReceipt);
            _coreContext.SaveChanges();
            return goodsReceipt;
        }

        public List<GoodsReceiptModel> GetAllGoodRecipts()
        {
            List<GoodsReceiptModel> listGoodRecipt = new List<GoodsReceiptModel>();
            listGoodRecipt = _goodReciptMapper.ToModels(_coreContext.GoodsReceipt
                                                        .Include(go => go.ListGoodReciptDetails)
                                                        .Include(go => go.Partner)
                                                        .ToList());
            return listGoodRecipt;
        }
        public GoodsReceiptModel? GetGoodReciptById(int id)
        {
            GoodsReceipt? goodsReceipt = _coreContext.GoodsReceipt.Where(g => g.Id == id)
                                                                .Include(go => go.ListGoodReciptDetails)
                                                                .Include(go => go.Partner)
                                                                .FirstOrDefault();
            return _goodReciptMapper.ToModel(goodsReceipt);
        }
    }

}
