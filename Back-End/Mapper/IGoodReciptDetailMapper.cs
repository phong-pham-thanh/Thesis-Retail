using APIBackend.DataModel;
using APIBackend.Models;
using APIBackEnd.Data;

namespace APIBackend.Mapper
{
    public interface IGoodReciptDetailMapper
    {
        public GoodReceiptDetailModel ToModel(GoodReceiptDetails efObject);
        public List<GoodReceiptDetailModel> ToModels(List<GoodReceiptDetails> efObjects);
        public void ToEntity (GoodReceiptDetails efObject, GoodReceiptDetailModel modelObject);
    }
}
