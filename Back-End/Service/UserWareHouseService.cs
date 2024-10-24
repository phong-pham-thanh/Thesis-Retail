using APIBackend.Models;
using APIBackend.Repository;
using APIBackEnd.Models;

namespace APIBackend.Service
{
    public interface IUserWareHouseService
    {
        public void AddNewUserAndListWareHouseIfNeed(UserModel user, List<int> lstWareHouseId);
        public void AddMangagerToWareHouseIfNeed(int userId, int wareHouse);
    }
    public class UserWareHouseService : IUserWareHouseService
    {
        private IUserWareHouseRepository _userWareHouseRepository;
        public UserWareHouseService(IUserWareHouseRepository userWareHouseRepository)
        {
            _userWareHouseRepository = userWareHouseRepository;
        }
        public void AddNewUserAndListWareHouseIfNeed(UserModel user, List<int> lstWareHouseId)
        {
            List<UserWareHouseModel> lstCurrentWareHouseForUser = _userWareHouseRepository.GetAllByUserId(user.Id);
            if(lstCurrentWareHouseForUser != null && lstCurrentWareHouseForUser.Count() > 0)
            {
                _userWareHouseRepository.RemoveAllByUserId(user.Id);
            }
            _userWareHouseRepository.AddUserToListWareHouse(user.Id, lstWareHouseId);
        }

        public void AddMangagerToWareHouseIfNeed(int userId, int wareHouseId)
        {
            List<UserWareHouseModel> lstCurrentWareHouseForUser = _userWareHouseRepository.GetAllByUserId(userId);
            if(lstCurrentWareHouseForUser.Where(x => x.UserId == userId && x.WareHouseId == wareHouseId).Count() == 0)
            {
                _userWareHouseRepository.AddUserToListWareHouse(userId, new List<int>{wareHouseId});
                return;
            }
        }

    }
}
