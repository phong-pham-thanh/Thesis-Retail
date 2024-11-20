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
        public UserModel SetSession(int userId);

    }
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        private IUserWareHouseRepository _userWareHouseRepository;
        private IWareHouseRepository _wareHouseRepository;
        private readonly IUserWareHouseService _userWareHouseService;
        protected readonly IUnityOfWorkFactory _uowFactory;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(
            IUserRepository userRepository, 
            IUserWareHouseRepository userWareHouseRepository,
            IWareHouseRepository wareHouseRepository,
            IUserWareHouseService userWareHouseService,
            IUnityOfWorkFactory uowFactory,
            IHttpContextAccessor httpContextAccessor
            ) 
        {
            _userRepository = userRepository;
            _userWareHouseRepository = userWareHouseRepository;
            _wareHouseRepository = wareHouseRepository;
            _userWareHouseService = userWareHouseService;
            _uowFactory = uowFactory;
            _httpContextAccessor = httpContextAccessor;
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
            UserModel result = _userRepository.GetUserLogin(username, password);
            if (result != null)
            {
                //Add result to currentUser here
                _httpContextAccessor.HttpContext.Session.SetString("currentUser", result.Id.ToString());

            }
            return result;
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

        public UserModel SetSession(int userId)
        {
            _httpContextAccessor.HttpContext.Session.SetInt32("currentUserId", userId);
            return _userRepository.GetUserById(userId);
        }

    }
}
