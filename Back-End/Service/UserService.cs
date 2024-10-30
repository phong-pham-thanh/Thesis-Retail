using APIBackend.Repository;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using NGO.Core.Repositories;

namespace APIBackend.Service
{
    public interface IUserService
    {
        public List<UserModel> GetAll();
        public List<UserModel> GetAllWithFullInfor();
        public UserModel GetById(int id);
        public UserModel GetUserLogin(string username, string password);
        public UserModel Update(int id, UserModel user);
        public UserModel Add(UserModel user);

    }
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        private IUserWareHouseRepository _userWareHouseRepository;
        private IWareHouseRepository _wareHouseRepository;
        private readonly IUserWareHouseService _userWareHouseService;
        protected readonly IUnityOfWorkFactory _uowFactory;

        public UserService(
            IUserRepository userRepository, 
            IUserWareHouseRepository userWareHouseRepository,
            IWareHouseRepository wareHouseRepository,
            IUserWareHouseService userWareHouseService,
            IUnityOfWorkFactory uowFactory
            ) 
        {
            _userRepository = userRepository;
            _userWareHouseRepository = userWareHouseRepository;
            _wareHouseRepository = wareHouseRepository;
            _userWareHouseService = userWareHouseService;
            _uowFactory = uowFactory;
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

        public UserModel Add(UserModel user)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                UserModel result = _userRepository.Add(user);
                _userWareHouseService.UpdateUserWareHouseforUser(result.Id, user);
                uow.Commit();
                return result;
            }
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
        public UserModel Update(int id, UserModel user)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                UserModel result = _userRepository.Update(id, user);
                _userWareHouseService.UpdateUserWareHouseforUser(id, user);
                uow.Commit();
                return result;
            }
        }


    }
}
