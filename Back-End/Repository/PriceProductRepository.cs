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
        public PriceProductModel GetLastPriceByProductId(int productId);
        public List<PriceProductModel> GetByProductId(int productId);
        public PriceProductModel AddNew(PriceProductModel domObject);
        public PriceProductModel Update(int id, PriceProductModel domObject);
        public bool Delete(int id);
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

        public PriceProductModel GetLastPriceByProductId(int productId)
        {
            return _priceProductMapper.ToModel(_coreContext.PriceProduct.Where(p => p.ProductId == productId).OrderByDescending(p => p.Id).FirstOrDefault());
        }

        public PriceProductModel AddNew(PriceProductModel domObject)
        {
            PriceProduct efobject = new PriceProduct();
            _priceProductMapper.ToEntity(efobject, domObject);
            _coreContext.PriceProduct.Add(efobject);
            _coreContext.SaveChanges(true);
            return _priceProductMapper.ToModel(efobject);
        }

        public PriceProductModel Update(int id, PriceProductModel domObject)
        {
            PriceProduct efobject =_coreContext.PriceProduct.Where(p => p.Id == id).FirstOrDefault();
            if(efobject == null)
            {
                return null;
            }
            _priceProductMapper.ToEntity(efobject, domObject);
            efobject.Id = id;
            _coreContext.SaveChanges(true);
            return _priceProductMapper.ToModel(efobject);
        }

        public bool Delete(int id)
        {
            PriceProduct priceProduct = _coreContext.PriceProduct.Where(x =>x.Id == id).FirstOrDefault();
            if (priceProduct == null)
            {
                return false;
            }
            _coreContext.PriceProduct.Remove(priceProduct);
            _coreContext.SaveChanges();
            return true;
        }
        public List<PriceProductModel> GetByProductId(int productId)
        {
            return _priceProductMapper.ToModels(_coreContext.PriceProduct.Where(x => x.ProductId == productId).ToList());

        }
    }
}
