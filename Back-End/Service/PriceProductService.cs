using APIBackend.Models;
using APIBackend.Repository;
using APIBackEnd.Data;
using APIBackEnd.Repository;
using System.Collections.Generic;

namespace APIBackend.Service
{
    public interface IPriceProductService
    {
        public List<PriceProductModel> GetAll();
        public List<PriceProductModel> GetByProductId(int productId);
        public PriceProductModel AddNew(PriceProductModel priceProductModel);
        public PriceProductModel Update(int id, PriceProductModel priceProductModel);
        public bool Delete(int id);

    }
    public class PriceProductService : IPriceProductService
    {
        private readonly IPriceProductRepository _priceProductRepository;
        private readonly IProductRepository _productRepository;

        public PriceProductService(
            IPriceProductRepository priceProductRepository,
            IProductRepository productRepository) 
        {
            _priceProductRepository = priceProductRepository;
            _productRepository = productRepository;
        }
        public List<PriceProductModel> GetAll()
        {
            List < PriceProductModel> result = _priceProductRepository.GetAll();
            foreach (PriceProductModel priceProductModel in result)
            {
                priceProductModel.Product = _productRepository.GetProductById(priceProductModel.ProductId);
            }
            result = result.OrderByDescending(x => x.Active).ToList();

            return result;
        }

        public PriceProductModel AddNew(PriceProductModel priceProductModel)
        {
            return _priceProductRepository.AddNew(priceProductModel);
        }
        public PriceProductModel Update(int id, PriceProductModel priceProductModel)
        {
            return _priceProductRepository.Update(id, priceProductModel);
        }


        public bool Delete(int id)
        {
            return _priceProductRepository.Delete(id);
        }

        public List<PriceProductModel> GetByProductId(int productId)
        {
            return _priceProductRepository.GetByProductId(productId);
        }

    }
}
