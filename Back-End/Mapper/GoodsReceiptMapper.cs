using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Mapper
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
            modelObject.PartnerId = efObject.PartnerId;
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
                modelObject.PartnerId = item.PartnerId;
                modelObject.ReceiptStatus = item.ReceiptStatus;
                modelObject.ExportDate = item.ExportDate;
                result.Add(modelObject);
            }
            return result;
        }
    }
}
