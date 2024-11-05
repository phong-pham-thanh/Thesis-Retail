using APIBackEnd.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;

namespace APIBackend.Service
{
    public interface IUserSessionService
    {
        public UserModel GetCurrentUser();
    }
    public class UserSessionService : IUserSessionService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserSessionService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public UserModel GetCurrentUser()
        {
            var userJson = _httpContextAccessor.HttpContext?.Session.GetString("CurrentUser");

            if (userJson != null)
            {
                return JsonConvert.DeserializeObject<UserModel>(userJson);
            }
            else
            {
                throw new ArgumentException($"Người dùng chưa đăng nhập.");
            }
        }
    }
}
