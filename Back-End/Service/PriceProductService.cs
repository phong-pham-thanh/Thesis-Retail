using APIBackend.Models;
using APIBackend.Repository;
using APIBackEnd.Data;
using APIBackEnd.Repository;

namespace APIBackend.Service
{
    public interface IPriceProductService
    {
        public List<PriceProductModel> GetAll();
        public PriceProductModel AddNew(PriceProductModel priceProductModel);

    }
    public class PriceProductService : IPriceProductService
    {
        private readonly IPriceProductRepository _priceProductRepository;

        public PriceProductService(
            IPriceProductRepository priceProductRepository) 
        {
            _priceProductRepository = priceProductRepository;
        }
        public List<PriceProductModel> GetAll()
        {
            return _priceProductRepository.GetAll();
        }

        public PriceProductModel AddNew(PriceProductModel priceProductModel)
        {
            return _priceProductRepository.AddNew(priceProductModel);
        }
    }
}
