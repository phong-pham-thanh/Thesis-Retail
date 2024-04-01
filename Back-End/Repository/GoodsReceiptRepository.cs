using TestAPI.Data;
using TestAPI.Mapper;
using TestAPI.Models;

namespace TestAPI.Repository
{
    public class ReceiptRepository : IGReceiptRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IGoodsReceiptMapper _receiptMapper;

        public ReceiptRepository(CoreContext _context, IGoodsReceiptMapper ReceiptMapper)
        {
            _coreContext = _context;
            _receiptMapper = ReceiptMapper;
        }

        public List<GoodsReceiptModel> GetAllGoodsReceipt()
        {
            List<GoodsReceipt> goodsReceipts = _coreContext.GoodsReceipt.ToList();
            return _receiptMapper.ToModels(goodsReceipts);
        }
    }
}
