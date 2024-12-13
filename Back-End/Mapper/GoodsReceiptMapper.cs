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
        private readonly IUserMapper _userMapper;
        public GoodsReceiptMapper(IGoodReciptDetailMapper goodReciptDetailMapper,
            IPartnerMapper partnerMapper,
            IUserMapper userMapper,
            IWareHouseMapper wareHouseMapper
            ) 
        {
            _goodReciptDetailMapper = goodReciptDetailMapper;
            _partnerMapper = partnerMapper;
            _wareHouseMapper = wareHouseMapper;
            _userMapper = userMapper;
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
            modelObject.CreatedById = efObject.CreatedById;
            modelObject.CreatedBy = _userMapper.ToModel(efObject.CreatedBy);
            modelObject.AcceptedById = efObject.AcceptedById;
            modelObject.AcceptedBy = _userMapper.ToModel(efObject.AcceptedBy);
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
                modelObject.CreatedById = item.CreatedById;
                modelObject.AcceptedById = item.CreatedById;
                modelObject.AcceptedBy = _userMapper.ToModel(item.AcceptedBy);
                modelObject.CreatedBy = _userMapper.ToModel(item.CreatedBy);
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
            efObject.PartnerId = modelObject.PartnerID;
            efObject.WareHouseId = modelObject.WareHouseId;
            efObject.ReceiptStatus = modelObject.ReceiptStatus;
            efObject.ImportDate = modelObject.ImportDate;
            efObject.TotalAmount = modelObject.TotalAmount;
            efObject.CreatedById = modelObject.CreatedById;
            efObject.AcceptedById = modelObject.AcceptedById;
            return;
        }
    }
}
