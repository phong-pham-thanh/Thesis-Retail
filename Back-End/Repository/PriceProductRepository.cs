using APIBackend.DataModel;
using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Mapper;

namespace APIBackend.Repository
{
    public interface IPriceProductRepository
    {
        public List<PriceProductModel> GetAll();
        public PriceProductModel AddNew(PriceProductModel domObject);
    }
    public class PriceProductRepository : IPriceProductRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IPriceProductMapper _priceProductMapper;
        public PriceProductRepository(
            CoreContext coreContext, 
            IPriceProductMapper priceProductMapper) 
        {
            _coreContext = coreContext;
            _priceProductMapper = priceProductMapper;
        }

        public List<PriceProductModel> GetAll()
        {
            return _priceProductMapper.ToModels(_coreContext.PriceProduct.ToList());
        }

        public PriceProductModel AddNew(PriceProductModel domObject)
        {
            PriceProduct efobject = new PriceProduct();
            _priceProductMapper.ToEntity(efobject, domObject);
            _coreContext.PriceProduct.Add(efobject);
            _coreContext.SaveChanges(true);
            return _priceProductMapper.ToModel(efobject);
        }


    }
}
