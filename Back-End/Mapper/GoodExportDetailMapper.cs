using APIBackend.DataModel;
using APIBackend.Models;
using APIBackEnd.Data;

namespace APIBackend.Mapper
{
    public interface IGoodExportDetailMapper
    {
        public GoodExportDetailModel ToModel(GoodExportDetails efObject);
        public List<GoodExportDetailModel> ToModels(List<GoodExportDetails> efObjects);
        public void ToEntity(GoodExportDetails efObject, GoodExportDetailModel modelObject);
    }
    public class GoodExportDetailMapper : IGoodExportDetailMapper
    {
        public GoodExportDetailMapper() { }
        public GoodExportDetailModel ToModel(GoodExportDetails efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            GoodExportDetailModel modelObject = new GoodExportDetailModel();
            modelObject.Id = efObject.Id;
            // modelObject.Product = efObject.Product;
            modelObject.ProductId = efObject.ProductId;
            //modelObject.GoodsExport = efObject.GoodsExport;
            modelObject.GoodExportId = efObject.GoodExportId;
            modelObject.Quantity = efObject.Quantity;
            return modelObject;
        }

        public List<GoodExportDetailModel> ToModels(List<GoodExportDetails> efObjects)
        {
            if(efObjects == null || efObjects.Count == 0)
            {
                return null;
            }
            List<GoodExportDetailModel> result = new List<GoodExportDetailModel>();
            foreach (GoodExportDetails item in efObjects)
            {
                GoodExportDetailModel modelObject = new GoodExportDetailModel();
                modelObject.Id = item.Id;
                // modelObject.Product = item.Product;
                modelObject.ProductId = item.ProductId;
                modelObject.GoodExportId = item.GoodExportId;
                modelObject.Quantity = item.Quantity;
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(GoodExportDetails efObject, GoodExportDetailModel modelObject)
        {
            if (modelObject == null) return;

            efObject.ProductId = modelObject.ProductId;
            efObject.GoodExportId = modelObject.GoodExportId;
            efObject.Quantity = modelObject.Quantity;
            return;
        }
    }
}
