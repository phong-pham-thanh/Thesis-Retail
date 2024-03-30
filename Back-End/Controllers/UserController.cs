using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TestAPI.Data;
using TestAPI.Models;
using TestAPI.Repository;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;

namespace TestAPI.Controllers
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
        private IUserRepository _userRerpository;

        public UserController(IUserRepository userRepository) {
            _userRerpository = userRepository;
        }

        [HttpGet]
        public List<UserModel> GetAll()
        {
            List<UserModel> temp = _userRerpository.GetAllUser();
            return temp;
        }

        [Route("login/")]
        [HttpPost]
        public UserModel GetLoginUser([FromBody] LoginModel data)
        {
            string username = data.username;
            string password = data.password;

            UserModel userResult = _userRerpository.GetUserLogin(username, password);
            if(userResult != null)
            {
                HttpContext.Session.SetInt32("CurrentUserId", userResult.Id);
            }
            return userResult;
        }

        [Route("testSession/")]
        [HttpGet]
        public int GetCurrentUser()
        {
            var temp = HttpContext.Session.GetInt32("CurrentUserId");
            if (temp != null)
            {
                return (int)temp;
            }
            return -1;
        }
    }
}
