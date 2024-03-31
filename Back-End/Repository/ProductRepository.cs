using Microsoft.EntityFrameworkCore;
using TestAPI.Data;
using TestAPI.Mapper;
using TestAPI.Models;

namespace TestAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IProductMapper _productMapper;

        public ProductRepository(CoreContext _context, IProductMapper productMapper)
        {
            _coreContext = _context;
            _productMapper = productMapper;
        }

        public List<ProductModel> GetAllProducts()
        {
            List<Product> products = _coreContext.Product.ToList();
            return _productMapper.ToModels(products);
        }
        public ProductModel GetProductById(int id)
        {
            Product product = _coreContext.Product.Where(p => p.Id == id).FirstOrDefault();
            return _productMapper.ToModel(product);
        }
        public bool DeleteProdcutById(int id)
        {
            var product = _coreContext.Product.Find(id);
            if (product == null)
            {
                return false;
            }
            _coreContext.Product.Remove(product);
            _coreContext.SaveChanges();
            return true;
        }

        public ProductModel UpdateProductById(int id, ProductModel product)
        {
            var productDataBase = _coreContext.Product.Find(id);
            if (productDataBase == null)
            {
                return null;
            }
            _productMapper.ToEntity(productDataBase, product);
            _coreContext.SaveChanges();
            return _productMapper.ToModel(productDataBase);
        }
        
    }
}
