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
        private readonly IPartnerMapper _partnerMapper;
        private readonly IWareHouseMapper _wareHouseMapper;
        public GoodsReceiptMapper(IGoodReciptDetailMapper goodReciptDetailMapper,
            IPartnerMapper partnerMapper,
            IWareHouseMapper wareHouseMapper
            ) 
        {
            _goodReciptDetailMapper = goodReciptDetailMapper;
            _partnerMapper = partnerMapper;
            _wareHouseMapper = wareHouseMapper;
        }
        public GoodsReceiptModel ToModel(GoodsReceipt efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            GoodsReceiptModel modelObject = new GoodsReceiptModel();
            modelObject.Id = efObject.Id;
            modelObject.WareHouseId = efObject.WareHouseId;
            modelObject.WareHouse = _wareHouseMapper.ToModel(efObject.WareHouse);
            modelObject.PartnerID = efObject.PartnerId;
            modelObject.Partner = _partnerMapper.ToModel(efObject.Partner);
            modelObject.ReceiptStatus = efObject.ReceiptStatus;
            modelObject.ImportDate = efObject.ImportDate;
            modelObject.TotalAmount = efObject.TotalAmount;
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
                modelObject.ImportDate = item.ImportDate;
                modelObject.TotalAmount = item.TotalAmount;
                modelObject.Partner = _partnerMapper.ToModel(item.Partner);
                modelObject.WareHouseId = item.WareHouseId;
                modelObject.WareHouse = _wareHouseMapper.ToModel(item.WareHouse);
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
            efObject.WareHouseId = modelObject.WareHouseId;
            efObject.ReceiptStatus = modelObject.ReceiptStatus;
            efObject.ImportDate = modelObject.ImportDate;
            efObject.TotalAmount = modelObject.TotalAmount;
            return;
        }
    }
}
