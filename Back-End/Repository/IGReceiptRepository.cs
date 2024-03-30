using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Repository
{
    public interface IGReceiptRepository
    {
        public List<GoodsReceiptModel> GetAllGoodsReceipt();
    }
}
