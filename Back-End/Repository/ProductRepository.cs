using Microsoft.EntityFrameworkCore;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Models;

namespace APIBackEnd.Repository
{
    public interface IProductRepository
    {
        public List<Product> GetAllProducts();
        public ProductModel GetProductById(int id);
        public ProductModel AddNewProduct(ProductModel product);
        public bool DeleteProdcutById(int id);
        public ProductModel UpdateProductById(int id, ProductModel product);
    }
    public class ProductRepository : IProductRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IProductMapper _productMapper;

        public ProductRepository(CoreContext _context, IProductMapper productMapper)
        {
            _coreContext = _context;
            _productMapper = productMapper;
        }

        public List<Product> GetAllProducts()
        {
            List<Product> products = _coreContext.Product.Include(p => p.Category).Include(p => p.ListInventories).ToList();
            return products;
        }
        public ProductModel GetProductById(int id)
        {
            Product product = _coreContext.Product.Where(p => p.Id == id).Include(p => p.Category).FirstOrDefault();
            if (product == null) return null;

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
            Product productDataBase = _coreContext.Product.Where(pr => pr.Id == id).FirstOrDefault();
            if (productDataBase == null)
            {
                return null;
            }
            _productMapper.ToEntity(productDataBase, product);
            productDataBase.Id = id;
            _coreContext.SaveChanges();
            return _productMapper.ToModel(productDataBase);
        }

        public ProductModel AddNewProduct(ProductModel newProduct)
        {
            Product product = new Product();
            _productMapper.ToEntity(product, newProduct);
            _coreContext.Product.Add(product);
            _coreContext.SaveChanges(true);
            return _productMapper.ToModel(product);
        }

    }
}
