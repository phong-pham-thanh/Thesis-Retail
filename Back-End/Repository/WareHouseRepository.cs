using APIBackend.DataModel;
using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Mapper;

namespace APIBackend.Repository
{
    public interface IWareHouseRepository
    {
        public List<WareHouseModel> GetAll();
        public WareHouseModel GetById(int id);
        public WareHouseModel AddNewWareHouse(WareHouseModel WareHouseModel);
        public WareHouseModel UpdateWareHouse(int id, WareHouseModel WareHouseModel);
        public List<WareHouseModel> GetBySearchName(string query);

    }
    public class WareHouseRepository : IWareHouseRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IWareHouseMapper _wareHouseMapper;


        public WareHouseRepository(CoreContext context, IWareHouseMapper wareHouseMapper) 
        {
            _coreContext = context;
            _wareHouseMapper = wareHouseMapper;
        }


        public List<WareHouseModel> GetAll()
        {
            return _wareHouseMapper.ToModels(_coreContext.WareHouses.ToList());
        }

        public WareHouseModel GetById(int id)
        {
            return _wareHouseMapper.ToModel(_coreContext.WareHouses.Where(w => w.Id == id).FirstOrDefault());
        }

        public WareHouseModel AddNewWareHouse(WareHouseModel WareHouseModel)
        {
            WareHouses efobject = new WareHouses();
            _wareHouseMapper.ToEntity(efobject, WareHouseModel);
            _coreContext.WareHouses.Add(efobject);
            _coreContext.SaveChanges(true);
            return _wareHouseMapper.ToModel(efobject);
        }
        public WareHouseModel UpdateWareHouse(int id, WareHouseModel WareHouseModel)
        {
            WareHouses WareHouseDataBase = _coreContext.WareHouses.Where(ca => ca.Id == id).FirstOrDefault();
            if (WareHouseDataBase == null)
            {
                return null;
            }
            _wareHouseMapper.ToEntity(WareHouseDataBase, WareHouseModel);
            WareHouseDataBase.Id = id;
            _coreContext.SaveChanges();
            return _wareHouseMapper.ToModel(WareHouseDataBase);
        }
        
        public List<WareHouseModel> GetBySearchName(string query)
        {
            return _wareHouseMapper.ToModels(_coreContext.WareHouses.Where(ca => ca.Address.ToLower().Contains(query.ToLower())).ToList());
        }
    }
}
