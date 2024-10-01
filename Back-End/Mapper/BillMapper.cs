using APIBackend.DataModel;
using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;

namespace APIBackEnd.Mapper
{
    
    public interface IBillMapper
    {
        public BillModel ToModel(Bill efObject);
        public List<BillModel> ToModels(List<Bill> efObject);
        public void ToEntity(Bill efObject, BillModel modelObject);
    }

    public class BillMapper : IBillMapper
    {
        private readonly IBillDetailMapper _billDetailMapper;
        private readonly ICustomerMapper _customerMapper;
        private readonly IWareHouseMapper _warehouseMapper;
        public BillMapper(
            IBillDetailMapper billDetailMapper, 
            ICustomerMapper customerMapper,
            IWareHouseMapper wareHouseMapper) 
        {
            _billDetailMapper = billDetailMapper;
            _customerMapper = customerMapper;
            _warehouseMapper = wareHouseMapper;
        }

        public BillModel? ToModel(Bill efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            BillModel modelObject = new BillModel();
            modelObject.Id = efObject.Id;
            modelObject.CustomerId = efObject.CustomerId;
            modelObject.WareHouseId = efObject.WareHouseId;
            modelObject.Customer = _customerMapper.ToModel(efObject.Customer);
            modelObject.WareHouse = _warehouseMapper.ToModel(efObject.WareHouse);
            modelObject.CreatedDate = efObject.CreatedDate;
            modelObject.TotalAmount = efObject.TotalAmount;
            modelObject.UserId = efObject.UserId;
            modelObject.ListBillDetails = _billDetailMapper.ToModels(efObject.ListBillDetails);
            return modelObject;
        }

        public List<BillModel> ToModels(List<Bill> efObjects)
        {
            List<BillModel> result = new List<BillModel>();
            foreach (Bill item in efObjects)
            {
                BillModel modelObject = new BillModel();
                modelObject.Id = item.Id;
                modelObject.CustomerId = item.CustomerId;
                modelObject.WareHouseId = item.WareHouseId;
                modelObject.CreatedDate = item.CreatedDate;
                modelObject.TotalAmount = item.TotalAmount;
                modelObject.UserId = item.UserId;
                modelObject.Customer = _customerMapper.ToModel(item.Customer);
                modelObject.WareHouse = _warehouseMapper.ToModel(item.WareHouse);
                modelObject.ListBillDetails = _billDetailMapper.ToModels(item.ListBillDetails);
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(Bill efObject, BillModel modelObject)
        {
            if (modelObject == null)
            {
                return;
            }
            efObject.Id = modelObject.Id;
            efObject.CustomerId = modelObject.CustomerId;
            efObject.WareHouseId = modelObject.WareHouseId;
            efObject.CreatedDate = modelObject.CreatedDate;
            efObject.TotalAmount = modelObject.TotalAmount;
            efObject.UserId = modelObject.UserId;
            return;
        }

    }

}
