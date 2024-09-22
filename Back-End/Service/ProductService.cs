using APIBackend.Repository;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Models;
using APIBackEnd.Repository;

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
        private readonly CoreContext _coreContext;
        private readonly IProductMapper _productMapper;
        private readonly IProductRepository _productRepository;
        private readonly IInventoryRepository _inventoryRepository;
        public ProductService(CoreContext _context, IProductMapper productMapper, IProductRepository productRepository, IInventoryRepository inventoryRepository)
        {
            _coreContext = _context;
            _productMapper = productMapper;
            _productRepository = productRepository;
            _inventoryRepository = inventoryRepository;
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
            return _productRepository.UpdateProductById(id, product);
        }

        public ProductModel AddNewProduct(ProductModel newProduct)
        {
            return _productRepository.AddNewProduct(newProduct);
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
