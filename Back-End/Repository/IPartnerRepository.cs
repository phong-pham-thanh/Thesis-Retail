using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Repository
{
    public interface IPartnerRepository
    {
        public List<PartnerModel> GetAllPartner();
    }
}
