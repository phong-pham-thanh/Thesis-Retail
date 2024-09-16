using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Models;

namespace APIBackEnd.Repository
{
    public interface IPartnerRepository
    {
        public List<PartnerModel> GetAll();
        public PartnerModel GetById(int id);
        public PartnerModel AddNewPartner(PartnerModel PartnerModel);
        public PartnerModel UpdatePartner(int id, PartnerModel PartnerModel);
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

        public List<PartnerModel> GetAll()
        {
            List<Partners> partners = _coreContext.Partners.ToList();
            return _partnerMapper.ToModels(partners);
        }

        public PartnerModel GetById(int id)
        {
            return _partnerMapper.ToModel(_coreContext.Partners.Where(w => w.Id == id).FirstOrDefault());
        }

        public PartnerModel AddNewPartner(PartnerModel PartnerModel)
        {
            Partners efobject = new Partners();
            _partnerMapper.ToEntity(efobject, PartnerModel);
            _coreContext.Partners.Add(efobject);
            _coreContext.SaveChanges(true);
            return _partnerMapper.ToModel(efobject);
        }
        public PartnerModel UpdatePartner(int id, PartnerModel PartnerModel)
        {
            Partners PartnerDataBase = _coreContext.Partners.Where(ca => ca.Id == id).FirstOrDefault();
            if (PartnerDataBase == null)
            {
                return null;
            }
            _partnerMapper.ToEntity(PartnerDataBase, PartnerModel);
            PartnerDataBase.Id = id;
            _coreContext.SaveChanges();
            return _partnerMapper.ToModel(PartnerDataBase);
        }
    }
}
