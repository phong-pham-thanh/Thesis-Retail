using APIBackend.Repository;
using APIBackEnd.Models;
using APIBackEnd.Repository;

namespace APIBackend.Service
{
    public interface IUserService
    {
        public List<UserModel> GetAll();
        public List<UserModel> GetAllWithFullInfor();
        public UserModel GetById(int id);
        public UserModel GetUserLogin(string username, string password);

    }
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        private IUserWareHouseRepository _userWareHouseRepository;
        private IWareHouseRepository _wareHouseRepository;

        public UserService(
            IUserRepository userRepository, 
            IUserWareHouseRepository userWareHouseRepository,
            IWareHouseRepository wareHouseRepository
            ) 
        {
            _userRepository = userRepository;
            _userWareHouseRepository = userWareHouseRepository;
            _wareHouseRepository = wareHouseRepository;
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

        public List<UserModel> GetAllWithFullInfor()
        {
            List<UserModel> result = _userRepository.GetAllUser();
            foreach (UserModel user in result) 
            {
                user.ListUserWareHouse = _userWareHouseRepository.GetAllByUserId(user.Id);
                foreach(var item in user.ListUserWareHouse)
                {
                    item.WareHouseModel = _wareHouseRepository.GetById(item.WareHouseId);
                }
            }
            return result;
        }

    }
}
