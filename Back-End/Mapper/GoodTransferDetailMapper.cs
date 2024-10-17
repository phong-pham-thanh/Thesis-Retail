using APIBackend.DataModel;
using APIBackend.Models;

namespace APIBackend.Mapper
{
    public interface IGoodTransferDetailMapper
    {
        public GoodTransferDetailModel ToModel(GoodTransferDetails efObject);
        public List<GoodTransferDetailModel> ToModels(List<GoodTransferDetails> efObjects);
        public void ToEntity(GoodTransferDetails efObject, GoodTransferDetailModel modelObject);
    }
    public class GoodTransferDetailMapper : IGoodTransferDetailMapper
    {
        public GoodTransferDetailMapper() { }
        public GoodTransferDetailModel ToModel(GoodTransferDetails efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            GoodTransferDetailModel modelObject = new GoodTransferDetailModel();
            modelObject.Id = efObject.Id;
            // modelObject.Product = efObject.Product;
            modelObject.ProductId = efObject.ProductId;
            //modelObject.GoodsTransfer = efObject.GoodsTransfer;
            modelObject.GoodTransferId = efObject.GoodTransferId;
            modelObject.Quantity = efObject.Quantity;
            return modelObject;
        }

        public List<GoodTransferDetailModel> ToModels(List<GoodTransferDetails> efObjects)
        {
            if(efObjects == null || efObjects.Count == 0)
            {
                return null;
            }
            List<GoodTransferDetailModel> result = new List<GoodTransferDetailModel>();
            foreach (GoodTransferDetails item in efObjects)
            {
                GoodTransferDetailModel modelObject = new GoodTransferDetailModel();
                modelObject.Id = item.Id;
                // modelObject.Product = item.Product;
                modelObject.ProductId = item.ProductId;
                modelObject.GoodTransferId = item.GoodTransferId;
                modelObject.Quantity = item.Quantity;
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(GoodTransferDetails efObject, GoodTransferDetailModel modelObject)
        {
            if (modelObject == null) return;

            efObject.ProductId = modelObject.ProductId;
            efObject.GoodTransferId = modelObject.GoodTransferId;
            efObject.Quantity = modelObject.Quantity;
            return;
        }
    }
}
