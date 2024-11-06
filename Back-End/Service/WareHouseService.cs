using APIBackend.Models;
using APIBackend.Repository;
using APIBackEnd.Data;
using NGO.Core.Repositories;

namespace APIBackend.Service
{
    public interface IWareHouseService
    {
        public List<WareHouseModel> GetAll();
        public List<WareHouseModel> GetAllByRole();
        public WareHouseModel GetById(int id);
        public WareHouseModel AddNewWareHouse(WareHouseModel WareHouseModel);
        public WareHouseModel UpdateWareHouse(int id, WareHouseModel WareHouseModel);
        public List<WareHouseModel> GetBySearchName(string query);
    }
    public class WareHouseService : IWareHouseService
    {
        private readonly IWareHouseRepository _wareHouseRepository;
        private readonly IUserWareHouseService _userWareHouseService;
        protected readonly IUnityOfWorkFactory _uowFactory;
        public WareHouseService(
            IWareHouseRepository wareHouseRepository,
            IUserWareHouseService userWareHouseService,
            IUnityOfWorkFactory uowFactory)
        {
            _wareHouseRepository = wareHouseRepository;
            _userWareHouseService = userWareHouseService;
            _uowFactory = uowFactory;

        }
        public List<WareHouseModel> GetAll()
        {
            return _wareHouseRepository.GetAll();
        }

        public List<WareHouseModel> GetAllByRole()
        {
            List<WareHouseModel> result = _wareHouseRepository.GetAll();
            List<int> listIdWareHouseBelong = _userWareHouseService.GetListWareHouseCurrentUserBelong();
            return result.Where(w => listIdWareHouseBelong.Contains(w.Id)).ToList();
        }

        public WareHouseModel GetById(int id)
        {
            return _wareHouseRepository.GetById(id);
        }

        public WareHouseModel AddNewWareHouse(WareHouseModel wareHouseModel)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                Utilities.ValidateDuplicate<WareHouseModel>(_wareHouseRepository.GetAll(), wareHouseModel, id: null, columnName: "Address");
                WareHouseModel result = _wareHouseRepository.AddNewWareHouse(wareHouseModel);
                _userWareHouseService.AddMangagerToWareHouseIfNeed(result.ManagerId, result.Id);
                uow.Commit();
                return result;
            }
        }

        public WareHouseModel UpdateWareHouse(int id, WareHouseModel wareHouseModel)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                Utilities.ValidateDuplicate<WareHouseModel>(_wareHouseRepository.GetAll(), wareHouseModel, id: id, columnName: "Address");
                WareHouseModel result = _wareHouseRepository.UpdateWareHouse(id, wareHouseModel);
                _userWareHouseService.AddMangagerToWareHouseIfNeed(result.ManagerId, id);
                uow.Commit();
                return result;
            }
        }

        public List<WareHouseModel> GetBySearchName(string query)
        {
            return _wareHouseRepository.GetBySearchName(query);
        }
    }
}
