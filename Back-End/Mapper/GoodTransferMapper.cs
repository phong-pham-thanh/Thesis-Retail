using APIBackend.DataModel;
using APIBackend.Models;

namespace APIBackend.Mapper
{
    public interface IGoodsTransferMapper
    {
        public GoodsTransferModel ToModel(GoodsTransfer efObject);
        public List<GoodsTransferModel> ToModels(List<GoodsTransfer> efObject);
        public void ToEntity(GoodsTransfer efObject, GoodsTransferModel modelObject);
    }
    public class GoodsTransferMapper : IGoodsTransferMapper
    {
        private readonly IGoodTransferDetailMapper _goodTransferDetailMapper;
        private readonly ICustomerMapper _customerMapper;
        private readonly IWareHouseMapper _warehouseMapper;
        public GoodsTransferMapper(
            IGoodTransferDetailMapper goodTransferDetailMapper, 
            ICustomerMapper customerMapper,
            IWareHouseMapper wareHouseMapper) 
        {
            _goodTransferDetailMapper = goodTransferDetailMapper;
            _customerMapper = customerMapper;
            _warehouseMapper = wareHouseMapper;
        }
        public GoodsTransferModel ToModel(GoodsTransfer efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            GoodsTransferModel modelObject = new GoodsTransferModel();
            modelObject.Id = efObject.Id;
            modelObject.TransferDate = efObject.TransferDate;
            modelObject.FromWareHouseId = efObject.FromWareHouseId;
            modelObject.ToWareHouseId = efObject.ToWareHouseId;
            modelObject.UserId = efObject.UserId;
            modelObject.Status = efObject.Status;
            modelObject.FromWareHouse = _warehouseMapper.ToModel(efObject.FromWareHouse);
            modelObject.ToWareHouse = _warehouseMapper.ToModel(efObject.ToWareHouse);
            modelObject.ListGoodTransferDetailsModel = _goodTransferDetailMapper.ToModels(efObject.ListGoodTransferDetails);
            return modelObject;
        }

        public List<GoodsTransferModel> ToModels(List<GoodsTransfer> efObjects)
        {
            List<GoodsTransferModel> result = new List<GoodsTransferModel>();
            foreach (GoodsTransfer item in efObjects)
            {
                GoodsTransferModel modelObject = new GoodsTransferModel();
                modelObject.Id = item.Id;
                modelObject.TransferDate = item.TransferDate;
                modelObject.FromWareHouseId = item.FromWareHouseId;
                modelObject.ToWareHouseId = item.ToWareHouseId;
                modelObject.UserId = item.UserId;
                modelObject.Status = item.Status;
                modelObject.FromWareHouse = _warehouseMapper.ToModel(item.FromWareHouse);
                modelObject.ToWareHouse = _warehouseMapper.ToModel(item.ToWareHouse);
                modelObject.ListGoodTransferDetailsModel = _goodTransferDetailMapper.ToModels(item.ListGoodTransferDetails);
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(GoodsTransfer efObject, GoodsTransferModel modelObject)
        {
            if (modelObject == null)
            {
                return;
            }
            efObject.TransferDate = modelObject.TransferDate;
            efObject.FromWareHouseId = modelObject.FromWareHouseId;
            efObject.ToWareHouseId = modelObject.ToWareHouseId;
            efObject.UserId = modelObject.UserId;
            efObject.Status = modelObject.Status;
            return;
        }
    }
}
