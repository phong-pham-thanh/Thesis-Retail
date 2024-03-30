using TestAPI.Data;
using TestAPI.Mapper;
using TestAPI.Models;

namespace TestAPI.Repository
{
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
