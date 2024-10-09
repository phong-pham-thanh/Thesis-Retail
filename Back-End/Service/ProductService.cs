using APIBackend.DataModel;
using APIBackend.Models;
using APIBackend.Repository;
using APIBackEnd.Data;
using APIBackEnd.Data.Enum;
using APIBackEnd.Mapper;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using NGO.Core.Repositories;
using System.Net.Http;

namespace APIBackend.Service
{
    public interface IProductService
    {
        public List<ProductModel> GetAllProducts();
        public ProductModel GetProductById(int id);
        public ProductModel AddNewProduct(ProductModel product);
        public bool DeleteProdcutById(int id);
        public ProductModel UpdateProductById(int id, ProductModel product);
        public List<ProductModel> GetBySearchName(string query);
        public List<ProductModel> GetByCategoryId(int cateId);
    }
    public class ProductService : IProductService
    {
        private readonly IProductMapper _productMapper;
        private readonly IProductRepository _productRepository;
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IPriceProductRepository _priceProductRepository;
        protected readonly IUnityOfWorkFactory _uowFactory;

        public ProductService(IProductMapper productMapper, 
            IProductRepository productRepository, 
            IInventoryRepository inventoryRepository,
            IPriceProductRepository priceProductRepository,
            IUnityOfWorkFactory uowFactory)
        {
            _productMapper = productMapper;
            _productRepository = productRepository;
            _inventoryRepository = inventoryRepository;
            _priceProductRepository = priceProductRepository;
            _uowFactory = uowFactory;
        }

        public List<ProductModel> GetAllProducts()
        {
            List<ProductModel> result = _productRepository.GetAllProducts();
            return result;
        }

        public ProductModel GetProductById(int id)
        {
            return _productRepository.GetProductById(id);
        }
        public bool DeleteProdcutById(int id)
        {
            return _productRepository.DeleteProdcutById(id);
        }

        public ProductModel UpdateProductById(int id, ProductModel product)
        {

            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                Utilities.ValidateDuplicate<ProductModel>(_productRepository.GetAllProducts(), product, id);
                ProductModel result = _productRepository.UpdateProductById(id, product);
                if (result.CurrentPrice != null)
                {
                    PriceProductModel priceProductModel = new PriceProductModel();
                    priceProductModel.ProductId = result.Id;
                    priceProductModel.Price = (int)result.CurrentPrice;
                    priceProductModel.StartDate = DateTime.Now;
                    priceProductModel.Active = true;

                    PriceProductModel lastPrice = _priceProductRepository.GetLastPriceByProductId(result.Id);
                    if (lastPrice != null)
                    {
                        lastPrice.EndDate = DateTime.Now;
                        lastPrice.Active = false;
                        _priceProductRepository.Update(lastPrice.Id, lastPrice);
                    }
                    _priceProductRepository.AddNew(priceProductModel);

                }
                else
                {
                    PriceProductModel lastPrice = _priceProductRepository.GetLastPriceByProductId(result.Id);
                    if (lastPrice != null)
                    {
                        lastPrice.EndDate = DateTime.Now;
                        lastPrice.Active = false;
                        _priceProductRepository.Update(lastPrice.Id, lastPrice);
                    }
                }
                uow.Commit();
                return result;
            }
        }

        public ProductModel AddNewProduct(ProductModel newProduct)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                Utilities.ValidateDuplicate<ProductModel>(_productRepository.GetAllProducts(), newProduct);
                ProductModel result = _productRepository.AddNewProduct(newProduct);
                if (result.CurrentPrice != null)
                {
                    PriceProductModel priceProductModel = new PriceProductModel();
                    priceProductModel.ProductId = result.Id;
                    priceProductModel.Price = (int)result.CurrentPrice;
                    priceProductModel.StartDate = DateTime.Now;
                    priceProductModel.Active = true;
                    _priceProductRepository.AddNew(priceProductModel);
                }
                uow.Commit();
                return result;
            }
        }

        public List<ProductModel> GetBySearchName(string query)
        {
            return _productRepository.GetBySearchName(query);
        }

        public List<ProductModel> GetByCategoryId(int cateId)
        {
            return _productRepository.GetByCategoryId(cateId);
        }
    }
}
