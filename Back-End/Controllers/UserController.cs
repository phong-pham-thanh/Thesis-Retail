using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using APIBackEnd.Data;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using APIBackend.Service;

namespace APIBackEnd.Controllers
{

    public class LoginModel
    {
        public string username { get; set; }
        public string password { get; set; }
    }

    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService) {
            _userService = userService;
        }

        [HttpGet]
        public List<UserModel> GetAll()
        {
            List<UserModel> temp = _userService.GetAll();
            return temp;
        }

        [Route("getAllWithFullInfo")]
        [HttpGet]
        public List<UserModel> GetAllWithFullInfor()
        {
            List<UserModel> temp = _userService.GetAllWithFullInfor();
            return temp;
        }

        [Route("login/")]
        [HttpPost]
        public UserModel GetLoginUser([FromBody] LoginModel data)
        {
            string username = data.username;
            string password = data.password;

            UserModel userResult = _userService.GetUserLogin(username, password);
            if(userResult != null)
            {
                HttpContext.Session.SetInt32("CurrentUserId", userResult.Id);
            }
            return userResult;
        }
    }
}
