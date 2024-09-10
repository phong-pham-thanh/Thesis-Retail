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
    }
}
