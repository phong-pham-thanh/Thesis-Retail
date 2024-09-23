using APIBackend.Models;
using APIBackend.Repository;
using APIBackEnd.Data;

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

        public WareHouseModel AddNewWareHouse(WareHouseModel wareHouseModel)
        {
            Utilities.ValidateDuplicate<WareHouseModel>(_wareHouseRepository.GetAll(), wareHouseModel, id: null, columnName: "Address");
            return _wareHouseRepository.AddNewWareHouse(wareHouseModel);
        }

        public WareHouseModel UpdateWareHouse(int id, WareHouseModel wareHouseModel)
        {
            Utilities.ValidateDuplicate<WareHouseModel>(_wareHouseRepository.GetAll(), wareHouseModel, id: id, columnName: "Address");
            return _wareHouseRepository.UpdateWareHouse(id, wareHouseModel);
        }

        public List<WareHouseModel> GetBySearchName(string query)
        {
            return _wareHouseRepository.GetBySearchName(query);
        }
    }
}
