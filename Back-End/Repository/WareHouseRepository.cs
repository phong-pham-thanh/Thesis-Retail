using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Mapper;

namespace APIBackend.Repository
{
    public interface IWareHouseRepository
    {
        public List<WareHouseModel> GetAll();

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
    }
}
