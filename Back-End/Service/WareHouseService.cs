using APIBackend.Models;
using APIBackend.Repository;

namespace APIBackend.Service
{
    public interface IWareHouseService
    {
        public List<WareHouseModel> GetAll();
    }
    public class WareHouseService : IWareHouseService
    {
        private readonly IWareHouseRepository _wareHouseRepository;
        public WareHouseService(IWareHouseRepository wareHouseRepository)
        {
            _wareHouseRepository = wareHouseRepository;

        }
        public List<WareHouseModel> GetAll()
        {
            return _wareHouseRepository.GetAll();
        }
    }
}
