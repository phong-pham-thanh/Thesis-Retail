using APIBackEnd.Models;
using APIBackEnd.Repository;

namespace APIBackend.Service
{
    public interface IUserService
    {
        public List<UserModel> GetAll();
        public UserModel GetById(int id);
        public UserModel GetUserLogin(string username, string password);

    }
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository) 
        {
            _userRepository = userRepository;
        }

        public List<UserModel> GetAll()
        {
            return _userRepository.GetAllUser();
        }

        public UserModel GetById(int id)
        {
            return _userRepository.GetUserById(id);
        }

        public UserModel GetUserLogin(string username, string password)
        {
            return _userRepository.GetUserLogin(username, password);
        }

    }
}
