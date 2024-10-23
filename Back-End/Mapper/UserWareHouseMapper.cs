using APIBackend.DataModel;
using APIBackEnd.Models;

namespace APIBackend.Mapper
{
    public interface IUserWareHouseMapper
    {
        public UserWareHouseModel ToModel(UserWareHouse efObject);
        public List<UserWareHouseModel> ToModels(List<UserWareHouse> efObject);
        public void ToEntity(UserWareHouse efObject, UserWareHouseModel domObject);
    }
    public class UserWareHouseMapper : IUserWareHouseMapper
    {
        public UserWareHouseMapper() { }
        public UserWareHouseModel ToModel(UserWareHouse efObject)
        {
            if(efObject == null)
            {
                return null;
            }

            UserWareHouseModel modelObject = new UserWareHouseModel();
            modelObject.Id = efObject.Id;
            modelObject.UserId = efObject.UserId;
            modelObject.WareHouseId = efObject.WareHouseId;
            return modelObject; 
        }

        public List<UserWareHouseModel> ToModels(List<UserWareHouse> efObjects)
        {
            List<UserWareHouseModel> result = new List<UserWareHouseModel> ();
            foreach (UserWareHouse item in efObjects)
            {
                UserWareHouseModel modelObject = new UserWareHouseModel();
                modelObject.Id = item.Id;
                modelObject.UserId = item.UserId;
                modelObject.WareHouseId = item.WareHouseId;
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(UserWareHouse efObject, UserWareHouseModel domObject)
        {
            if(domObject == null) return;
            efObject.UserId = domObject.UserId;
            efObject.WareHouseId = domObject.WareHouseId;
        }
    }
}
