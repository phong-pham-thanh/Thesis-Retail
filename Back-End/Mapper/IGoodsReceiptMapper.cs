using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Mapper
{
    public interface IGoodsReceiptMapper
    {
        public GoodsReceiptModel ToModel(GoodsReceipt efObject);
        public List<GoodsReceiptModel> ToModels(List<GoodsReceipt> efObject);
    }
}
