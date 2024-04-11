using APIBackend.DataModel;
using APIBackend.Models;
using APIBackEnd.Data;

namespace APIBackend.Mapper
{
    public interface IGoodReciptDetailMapper
    {
        public GoodReceiptDetailModel ToModel(GoodReceiptDetails efObject);
        public List<GoodReceiptDetailModel> ToModels(List<GoodReceiptDetails> efObjects);
        public void ToEntity(GoodReceiptDetails efObject, GoodReceiptDetailModel modelObject);
    }
    public class GoodReciptDetailMapper : IGoodReciptDetailMapper
    {
        public GoodReciptDetailMapper() { }
        public GoodReceiptDetailModel ToModel(GoodReceiptDetails efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            GoodReceiptDetailModel modelObject = new GoodReceiptDetailModel();
            modelObject.Id = efObject.Id;
            modelObject.Product = efObject.Product;
            modelObject.ProductId = efObject.ProductId;
            //modelObject.GoodsReceipt = efObject.GoodsReceipt;
            modelObject.GoodReceiptId = efObject.GoodReceiptId;
            modelObject.Quantity = efObject.Quantity;
            modelObject.PriceUnit = efObject.PriceUnit;
            return modelObject;
        }

        public List<GoodReceiptDetailModel> ToModels(List<GoodReceiptDetails> efObjects)
        {
            if(efObjects == null || efObjects.Count == 0)
            {
                return null;
            }
            List<GoodReceiptDetailModel> result = new List<GoodReceiptDetailModel>();
            foreach (GoodReceiptDetails item in efObjects)
            {
                GoodReceiptDetailModel modelObject = new GoodReceiptDetailModel();
                modelObject.Id = item.Id;
                modelObject.Product = item.Product;
                modelObject.ProductId = item.ProductId;
                //modelObject.GoodsReceipt = item.GoodsReceipt;
                modelObject.GoodReceiptId = item.GoodReceiptId;
                modelObject.Quantity = item.Quantity;
                modelObject.PriceUnit = item.PriceUnit;
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(GoodReceiptDetails efObject, GoodReceiptDetailModel modelObject)
        {
            if (modelObject == null) return;

            efObject.Id = modelObject.Id;
            efObject.ProductId = modelObject.ProductId;
            efObject.GoodReceiptId = modelObject.GoodReceiptId;
            efObject.Quantity = modelObject.Quantity;
            efObject.PriceUnit = modelObject.PriceUnit;
            return;
        }
    }
}
