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
    public class GoodsReceiptMapper : IGoodsReceiptMapper
    {
        public GoodsReceiptMapper() { }
        public GoodsReceiptModel ToModel(GoodsReceipt efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            GoodsReceiptModel modelObject = new GoodsReceiptModel();
            modelObject.Id = efObject.Id;
            modelObject.PartnerID = efObject.PartnerID;
            modelObject.ReceiptStatus = efObject.ReceiptStatus;
            modelObject.ExportDate = efObject.ExportDate;
            return modelObject;
        }

        public List<GoodsReceiptModel> ToModels(List<GoodsReceipt> efObjects)
        {
            List<GoodsReceiptModel> result = new List<GoodsReceiptModel>();
            foreach (GoodsReceipt item in efObjects)
            {
                GoodsReceiptModel modelObject = new GoodsReceiptModel();
                modelObject.Id = item.Id;
                modelObject.PartnerID = item.PartnerID;
                modelObject.ReceiptStatus = item.ReceiptStatus;
                modelObject.ExportDate = item.ExportDate;
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(GoodsReceipt efObject, GoodsReceiptModel modelObject)
        {
            if (modelObject == null)
            {
                return;
            }
            efObject.Id = modelObject.Id;
            efObject.PartnerID = modelObject.PartnerID;
            efObject.ReceiptStatus = modelObject.ReceiptStatus;
            efObject.ExportDate = modelObject.ExportDate;
            return;
        }
    }
}
