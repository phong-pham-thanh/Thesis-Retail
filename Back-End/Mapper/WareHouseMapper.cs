using APIBackend.DataModel;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Models;

namespace APIBackend.Mapper
{
    public interface IWareHouseMapper
    {
        public WareHouseModel ToModel(WareHouses efObject);
        public List<WareHouseModel> ToModels(List<WareHouses> efObjects);
        public void ToEntity(WareHouses efObject, WareHouseModel domObject);

    }

    public class WareHouseMapper : IWareHouseMapper
    {
        private IUserMapper _userMapper;
        public WareHouseMapper(IUserMapper userMapper)
        { 
            _userMapper = userMapper;
        }
        public WareHouseModel ToModel(WareHouses efObject)
        {
            if(efObject == null)
            {
                return null;
            }
            WareHouseModel domObject = new WareHouseModel();
            domObject.Id = efObject.Id;
            domObject.Address = efObject.Address;
            domObject.Status = efObject.Status;
            domObject.Manager = _userMapper.ToModel(efObject.Manager);
            domObject.ManagerId = efObject.ManagerId;
            domObject.Inventories = efObject.Inventories;
            return domObject;
        }
        public List<WareHouseModel> ToModels(List<WareHouses> efObjects)
        {
            List<WareHouseModel> result = new List<WareHouseModel>();

            foreach (WareHouses efObject in efObjects)
            {
                WareHouseModel modelObject = new WareHouseModel();
                modelObject.Id = efObject.Id;
                modelObject.Address = efObject.Address;
                modelObject.Status = efObject.Status;
                modelObject.Manager = _userMapper.ToModel(efObject.Manager);
                modelObject.ManagerId = efObject.ManagerId;
                modelObject.Inventories = efObject.Inventories;
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(WareHouses efObject, WareHouseModel domObject)
        {
            if(domObject == null) return;
            efObject.ManagerId = domObject.ManagerId;
            efObject.Address = domObject.Address;
            efObject.Status = domObject.Status;
        }
    }
}
