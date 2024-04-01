using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Repository
{
    public interface IUserRepository
    {
        public List<UserModel> GetAllUser();
        public UserModel GetUserLogin(string username, string password);
    }
}
