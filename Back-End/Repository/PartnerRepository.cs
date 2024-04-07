using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Models;

namespace APIBackEnd.Repository
{
    public interface IPartnerRepository
    {
        public List<PartnerModel> GetAllPartner();
    }
    public class PartnerRepository : IPartnerRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IPartnerMapper _partnerMapper;

        public PartnerRepository(CoreContext _context, IPartnerMapper partnerMapper)
        {
            _coreContext = _context;
            _partnerMapper = partnerMapper;
        }

        public List<PartnerModel> GetAllPartner()
        {
            List<Partners> partners = _coreContext.Partners.ToList();
            return _partnerMapper.ToModels(partners);
        }
    }
}
