using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Repository
{
    public interface IUserRepository
    {
        public List<UserModel> GetAllUser();
        public UserModel GetUserLogin(string username, string password);
    }
}
