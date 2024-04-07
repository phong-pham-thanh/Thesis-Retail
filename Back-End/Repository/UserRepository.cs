using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Models;

namespace APIBackEnd.Repository
{
    public interface IUserRepository
    {
        public List<UserModel> GetAllUser();
        public UserModel GetUserLogin(string username, string password);
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

        public UserModel GetUserLogin(string username, string password)
        {
            Users users = _coreContext.Users.Where(us => us.Username == username && us.Password == password).FirstOrDefault();
            return _userMapper.ToModel(users);
        }
    }
}
