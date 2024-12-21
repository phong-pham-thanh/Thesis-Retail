using APIBackend.Mapper;
using APIBackend.Models;
using APIBackend.Repository;
using APIBackEnd.Data;
using APIBackEnd.Repository;

namespace APIBackend.Service
{
    public interface IPartnerService
    {
        public List<PartnerModel> GetAll();
        public PartnerModel GetById(int id);
        public PartnerModel AddNewPartner(PartnerModel PartnerModel);
        public PartnerModel UpdatePartner(int id, PartnerModel PartnerModel);
        public List<PartnerModel> GetBySearchName(string query);

    }
    public class PartnerService : IPartnerService
    {
        private readonly IPartnerRepository _partnerRepository;
        public PartnerService(IPartnerRepository partnerRepository) 
        {
            _partnerRepository = partnerRepository;
        }
        public List<PartnerModel> GetAll()
        {
            return _partnerRepository.GetAll();
        }

        public PartnerModel GetById(int id)
        {
            return _partnerRepository.GetById(id);
        }

        public PartnerModel AddNewPartner(PartnerModel partnerModel)
        {
            Utilities.ValidateDuplicate<PartnerModel>(_partnerRepository.GetAll(), partnerModel, columnName: "PhoneNumber");
            return _partnerRepository.AddNewPartner(partnerModel);
        }

        public PartnerModel UpdatePartner(int id, PartnerModel partnerModel)
        {
            Utilities.ValidateDuplicate<PartnerModel>(_partnerRepository.GetAll(), partnerModel, id: id, "PhoneNumber");
            return _partnerRepository.UpdatePartner(id, partnerModel);
        }

        public List<PartnerModel> GetBySearchName(string query)
        {
            return _partnerRepository.GetBySearchName(query);
        }
    }
}
