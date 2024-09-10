using APIBackend.DataModel.DTO;
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
        public ProductModel AddNewProduct(CreateProductDTO product);
        public bool DeleteProdcutById(int id);
        public ProductModel UpdateProductById(int id, UpdateProductDTO product);
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
            List<ProductModel> result = _productMapper.ToModels(_productRepository.GetAllProducts());
            //foreach (ProductModel product in result)
            //{
            //    product.listInventories = _inventoryRepository.GetInventoriesByProductId(product.Id);
            //}
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

        public ProductModel UpdateProductById(int id, UpdateProductDTO product)
        {
            return _productMapper.ToModel(_productRepository.UpdateProductById(id, product));
        }

        public ProductModel AddNewProduct(CreateProductDTO newProduct)
        {
            return _productMapper.ToModel(_productRepository.AddNewProduct(newProduct));
        }
    }
}
