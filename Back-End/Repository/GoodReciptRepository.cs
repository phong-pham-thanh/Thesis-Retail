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
        public bool AddGoodRecipt(GoodsReceipt goodsReceip);
        public List<GoodsReceipt> GetAllGoodRecipts();
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

        public bool AddGoodRecipt(GoodsReceipt goodsReceipt)
        {
            _coreContext.GoodsReceipt.Add(goodsReceipt);
            _coreContext.SaveChanges();
            return true;
        }

        public List<GoodsReceipt> GetAllGoodRecipts()
        {
            List<GoodsReceipt> listGoodRecipt = new List<GoodsReceipt>();
            listGoodRecipt = _coreContext.GoodsReceipt.Include(go => go.ListGoodReciptDetails).ToList();
            return listGoodRecipt;
        }
    }

}
