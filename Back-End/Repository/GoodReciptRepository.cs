using APIBackend.DataModel;
using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Mapper;

namespace APIBackend.Repository
{
    public interface IGoodReciptRepository
    {
        public bool AddGoodRecipt(GoodsReceipt goodsReceip);
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



        public bool AddGoodReciptaaa(GoodsReceiptModel goodsReceiptModel, List<GoodReceiptDetailModel> listGoodReceiptDetailModels, int idWareHouse)
        {
            GoodsReceipt goodsReceipt = new GoodsReceipt();
            _goodReciptMapper.ToEntity(goodsReceipt, goodsReceiptModel);
            _coreContext.GoodsReceipt.Add(goodsReceipt);

            foreach(GoodReceiptDetailModel item in listGoodReceiptDetailModels)
            {
                GoodReceiptDetails goodReceiptDetails = new GoodReceiptDetails();
                _goodReciptDetailMapper.ToEntity(goodReceiptDetails, item);
                _coreContext.GoodReceiptDetails.Add(goodReceiptDetails);

            }
            _coreContext.SaveChanges();

            return true;
        }
    }
}
