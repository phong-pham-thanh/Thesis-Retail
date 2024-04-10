using APIBackend.Mapper;
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
        private readonly IGoodReciptDetailMapper _goodReciptDetailMapper;
        public GoodsReceiptMapper(IGoodReciptDetailMapper goodReciptDetailMapper) 
        {
            _goodReciptDetailMapper = goodReciptDetailMapper;
        }
        public GoodsReceiptModel ToModel(GoodsReceipt efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            GoodsReceiptModel modelObject = new GoodsReceiptModel();
            modelObject.Id = efObject.Id;
            modelObject.PartnerID = efObject.PartnerId;
            modelObject.ReceiptStatus = efObject.ReceiptStatus;
            modelObject.ExportDate = efObject.ExportDate;
            modelObject.ListGoodReciptDetailsModel = _goodReciptDetailMapper.ToModels(efObject.ListGoodReciptDetails);
            return modelObject;
        }

        public List<GoodsReceiptModel> ToModels(List<GoodsReceipt> efObjects)
        {
            List<GoodsReceiptModel> result = new List<GoodsReceiptModel>();
            foreach (GoodsReceipt item in efObjects)
            {
                GoodsReceiptModel modelObject = new GoodsReceiptModel();
                modelObject.Id = item.Id;
                modelObject.PartnerID = item.PartnerId;
                modelObject.ReceiptStatus = item.ReceiptStatus;
                modelObject.ExportDate = item.ExportDate;
                modelObject.ListGoodReciptDetailsModel = _goodReciptDetailMapper.ToModels(item.ListGoodReciptDetails);
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
            efObject.PartnerId = modelObject.PartnerID;
            efObject.ReceiptStatus = modelObject.ReceiptStatus;
            efObject.ExportDate = modelObject.ExportDate;
            return;
        }
    }
}
