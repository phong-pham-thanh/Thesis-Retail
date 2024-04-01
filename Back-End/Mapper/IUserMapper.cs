using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Mapper
{
    public interface IUserMapper
    {
        public UserModel ToModel(Users efObject);
        public List<UserModel> ToModels(List<Users> efObject);
    }
}
