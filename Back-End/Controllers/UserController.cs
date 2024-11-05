using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using APIBackEnd.Data;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using APIBackend.Service;
using APIBackend.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json;

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
        private IUserSessionService _userSessionService;

        public UserController(IUserService userService, IUserSessionService userSessionService) {
            _userService = userService;
            _userSessionService = userSessionService;
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

        [Route("update/{id}")]
        [HttpPut]
        public UserModel Update(int id, [FromBody] UserModel user)
        {
            UserModel result = _userService.Update(id, user);
            return result;
        }

        [Route("add")]
        [HttpPost]
        public UserModel Add([FromBody] UserModel user)
        {
            UserModel result = _userService.Add(user);
            return result;
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
                HttpContext.Session.SetString("CurrentUser", JsonConvert.SerializeObject(userResult));
            }
            return userResult;
        }

        [HttpGet("addSession/{id}")]
        public void SetUserToSession(int id)
        {
            var temp = HttpContext.Session.GetString("CurrentUser");
            var temp2222 = HttpContext.Session.GetString("currentUser");
            var currentUser = _userSessionService.GetCurrentUser();
            // UserModel currentUser = _userService.GetById(id);
            // if (currentUser != null)
            // {
            //     HttpContext.Session.SetString("currentUser", JsonConvert.SerializeObject(currentUser));
            // }
        }
    }
}
