using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Mapper
{
    public interface IGoodsReceiptMapper
    {
        public GoodsReceiptModel ToModel(GoodsReceipt efObject);
        public List<GoodsReceiptModel> ToModels(List<GoodsReceipt> efObject);
        public void ToEntity(GoodsReceipt efObject, GoodsReceiptModel modelObject);
    }
}
