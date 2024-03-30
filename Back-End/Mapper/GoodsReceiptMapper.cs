using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Mapper
{
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
    }
}
