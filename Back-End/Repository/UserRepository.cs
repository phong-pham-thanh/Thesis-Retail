using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Models;
using APIBackend.DataModel;
using APIBackend.Models;

namespace APIBackEnd.Repository
{
    public interface IUserRepository
    {
        public List<UserModel> GetAllUser();
        public UserModel GetUserLogin(string username, string password);
        public UserModel GetUserById(int id);
        public UserModel Update(int id, UserModel user);
        public UserModel Add(UserModel user);
    }
    public class UserRepository : IUserRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IUserMapper _userMapper;

        public UserRepository(CoreContext _context, IUserMapper userMapper) {
            _coreContext = _context;
            _userMapper = userMapper;
        }

        public List<UserModel> GetAllUser()
        {
            List < Users > users = _coreContext.Users.ToList();
            return _userMapper.ToModels(users);
        }

        public UserModel GetUserById(int id)
        {
            Users user = _coreContext.Users.Where(u => u.Id == id).FirstOrDefault();
            return _userMapper.ToModel(user);
        }

        public UserModel GetUserLogin(string username, string password)
        {
            Users users = _coreContext.Users.Where(us => us.Username == username && us.Password == password).FirstOrDefault();
            return _userMapper.ToModel(users);
        }
        public UserModel Update(int id, UserModel user)
        {
            Users efObject = _coreContext.Users.Where(u => u.Id == id).FirstOrDefault();
            if (efObject == null)
            {
                throw new ArgumentException("User not found");
            }
            _userMapper.ToEntity(efObject, user);
            _coreContext.SaveChanges();
            return _userMapper.ToModel(efObject);
        }
        public UserModel Add(UserModel user)
        {
            Users efobject = new Users();
            _userMapper.ToEntity(efobject, user);
            efobject.Password = "123";
            _coreContext.Users.Add(efobject);
            _coreContext.SaveChanges(true);
            return _userMapper.ToModel(efobject);
        }
    }
}
