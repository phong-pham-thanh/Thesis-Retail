using APIBackend.DataModel;
using APIBackend.Mapper;
using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackend.Repository
{
    public interface IUserWareHouseRepository
    {
        public List<UserWareHouseModel> GetAll();
        public List<UserWareHouseModel> GetAllByUserId(int userId);
        public void AddUserToListWareHouse(int userId, List<int> lstWareHouseId);
        public void RemoveListWarehouseOfUser(int userId, List<int> lstWareHouseId);
        public void RemoveAllByUserId(int userId);
        public UserWareHouseModel GetById(int id);
        public UserWareHouseModel AddNewUserWareHouse(UserWareHouseModel UserWareHouseModel);
        public UserWareHouseModel UpdateUserWareHouse(int id, UserWareHouseModel UserWareHouseModel);
    }
    public class UserWareHouseRepository : IUserWareHouseRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IUserWareHouseMapper _userWareHouseMapper;

        public UserWareHouseRepository(CoreContext _context, IUserWareHouseMapper userWareHouseMapper)
        {
            _coreContext = _context;
            _userWareHouseMapper = userWareHouseMapper;
        }

        public List<UserWareHouseModel> GetAll()
        {
            List<UserWareHouse> userWareHouses = _coreContext.UserWareHouse.ToList();
            return _userWareHouseMapper.ToModels(userWareHouses);
        }

        public UserWareHouseModel GetById(int id)
        {
            return _userWareHouseMapper.ToModel(_coreContext.UserWareHouse.Where(w => w.Id == id).FirstOrDefault());
        }

        public UserWareHouseModel AddNewUserWareHouse(UserWareHouseModel userWareHouseModel)
        {
            UserWareHouse efobject = new UserWareHouse();
            _userWareHouseMapper.ToEntity(efobject, userWareHouseModel);
            _coreContext.UserWareHouse.Add(efobject);
            _coreContext.SaveChanges(true);
            return _userWareHouseMapper.ToModel(efobject);
        }
        public UserWareHouseModel UpdateUserWareHouse(int id, UserWareHouseModel UserWareHouseModel)
        {
            UserWareHouse UserWareHouseDataBase = _coreContext.UserWareHouse.Where(ca => ca.Id == id).FirstOrDefault();
            if (UserWareHouseDataBase == null)
            {
                return null;
            }
            _userWareHouseMapper.ToEntity(UserWareHouseDataBase, UserWareHouseModel);
            _coreContext.SaveChanges();
            return _userWareHouseMapper.ToModel(UserWareHouseDataBase);
        }

        public List<UserWareHouseModel> GetAllByUserId(int userId)
        {
            return _userWareHouseMapper.ToModels(_coreContext.UserWareHouse.Where(x => x.UserId == userId).ToList());
        }

        public void AddUserToListWareHouse(int userId, List<int> lstWareHouseId)
        {
            foreach(int wareHouseId in lstWareHouseId)
            {
                UserWareHouse efobject = new UserWareHouse();
                efobject.UserId = userId;
                efobject.WareHouseId = wareHouseId;
                _coreContext.UserWareHouse.Add(efobject);
            }
            _coreContext.SaveChanges();
        }
        
        public void RemoveAllByUserId(int userId)
        {
            List<UserWareHouse> lstUserWareHouse = _coreContext.UserWareHouse.Where(x => x.UserId == userId).ToList();
            foreach (UserWareHouse efObject in lstUserWareHouse)
            {
                _coreContext.UserWareHouse.Remove(efObject);
            }
            _coreContext.SaveChanges();
            return;
        }

        public void RemoveListWarehouseOfUser(int userId, List<int> lstWareHouseId)
        {
            List<UserWareHouse> lstUserWareHouse = _coreContext.UserWareHouse.Where(x => x.UserId == userId && lstWareHouseId.Contains(x.WareHouseId)).ToList();
            foreach (UserWareHouse efObject in lstUserWareHouse)
            {
                _coreContext.UserWareHouse.Remove(efObject);
            }
            _coreContext.SaveChanges();
            return;
        }


    }
}
