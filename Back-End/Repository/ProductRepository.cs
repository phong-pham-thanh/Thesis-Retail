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
    }
}
