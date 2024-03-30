using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Mapper
{
    public interface IUserMapper
    {
        public UserModel ToModel(Users efObject);
        public List<UserModel> ToModels(List<Users> efObject);
    }
}
