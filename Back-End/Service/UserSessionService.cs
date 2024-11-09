using APIBackEnd.Models;
using APIBackEnd.Repository;

namespace APIBackend.Service
{
    public interface IUserSessionService
    {
        public UserModel GetCurrentUser();
    }
    public class UserSessionService : IUserSessionService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;

        public UserSessionService(
            IHttpContextAccessor httpContextAccessor,
            IUserRepository userRepository
            )
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }
        public UserModel GetCurrentUser()
        {
            int? userId = _httpContextAccessor.HttpContext.Session.GetInt32("currentUserId");
            if(userId == null)
            {
                throw new ArgumentException("Người dùng chưa đăng nhập");
            }
            return _userRepository.GetUserById((int)userId);
        }


    }
}
