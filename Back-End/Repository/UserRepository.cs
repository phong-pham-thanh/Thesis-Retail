using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TestAPI.Data;
using TestAPI.Mapper;
using TestAPI.Models;

namespace TestAPI.Repository
{
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
