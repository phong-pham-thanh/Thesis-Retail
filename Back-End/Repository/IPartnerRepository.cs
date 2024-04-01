using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Repository
{
    public interface IPartnerRepository
    {
        public List<PartnerModel> GetAllPartner();
    }
}
