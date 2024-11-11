using System.Collections.Generic;
using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Mapper
{
    public interface IUserMapper
    {
        public UserModel ToModel(Users efObject);
        public List<UserModel> ToModels(List<Users> efObject);
        public void ToEntity(Users efObject, UserModel domObject);
    }
    public class UserMapper : IUserMapper
    {
        public UserMapper() { }
        public UserModel ToModel(Users efObject)
        {
            if(efObject == null)
            {
                return null;
            }

            UserModel modelObject = new UserModel();
            modelObject.Id = efObject.Id;
            modelObject.Name = efObject.Name;
            modelObject.Username = efObject.Username;
            modelObject.Branch = efObject.Branch;
            modelObject.Address = efObject.Address;
            modelObject.Age = efObject.Age;                    
            modelObject.DateOnboard = efObject.DateOnboard;                    
            modelObject.DateOfBirth = efObject.DateOfBirth;
            modelObject.IsAdmin = efObject.IsAdmin;
            modelObject.DefaultWareHouseId = efObject.DefaultWareHouseId;
            return modelObject;                                  
        }

        public List<UserModel> ToModels(List<Users> efObjects)
        {
            List < UserModel > result = new List<UserModel> ();
            foreach (Users item in efObjects)
            {
                UserModel modelObject = new UserModel();
                modelObject.Id = item.Id;
                modelObject.Name = item.Name;
                modelObject.Username = item.Username;
                modelObject.Age = item.Age;
                modelObject.Branch = item.Branch;
                modelObject.Address = item.Address;
                modelObject.DateOnboard = item.DateOnboard;
                modelObject.DateOfBirth = item.DateOfBirth;
                modelObject.IsAdmin = item.IsAdmin;
                modelObject.DefaultWareHouseId = item.DefaultWareHouseId;
                result.Add(modelObject);
            }
            return result;
        }
        public void ToEntity(Users efObject, UserModel domObject)
        {
            efObject.Name = domObject.Name;
            efObject.Username = domObject.Username;
            efObject.Age = domObject.Age;
            efObject.Branch = domObject.Branch;
            efObject.Address = domObject.Address;
            efObject.DateOnboard = domObject.DateOnboard;
            efObject.DateOfBirth = domObject.DateOfBirth;
            efObject.IsAdmin = domObject.IsAdmin;
            efObject.DefaultWareHouseId = domObject.DefaultWareHouseId;
            return;
        }

    }
}
