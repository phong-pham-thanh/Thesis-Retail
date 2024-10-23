using System.Collections.Generic;
using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Mapper
{
    public interface IUserMapper
    {
        public UserModel ToModel(Users efObject);
        public List<UserModel> ToModels(List<Users> efObject);
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
                result.Add(modelObject);
            }
            return result;
        }
    }
}
