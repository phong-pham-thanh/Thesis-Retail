using APIBackend.Models;
using APIBackend.Repository;

namespace APIBackend.Service
{
    public interface IWareHouseService
    {
        public List<WareHouseModel> GetAll();
        public WareHouseModel GetById(int id);
        public WareHouseModel AddNewWareHouse(WareHouseModel WareHouseModel);
        public WareHouseModel UpdateWareHouse(int id, WareHouseModel WareHouseModel);
        public List<WareHouseModel> GetBySearchName(string query);
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

        public WareHouseModel GetById(int id)
        {
            return _wareHouseRepository.GetById(id);
        }

        public WareHouseModel AddNewWareHouse(WareHouseModel WareHouseModel)
        {
            return _wareHouseRepository.AddNewWareHouse(WareHouseModel);
        }

        public WareHouseModel UpdateWareHouse(int id, WareHouseModel WareHouseModel)
        {
            return _wareHouseRepository.UpdateWareHouse(id, WareHouseModel);
        }

        public List<WareHouseModel> GetBySearchName(string query)
        {
            return _wareHouseRepository.GetBySearchName(query);
        }
    }
}
