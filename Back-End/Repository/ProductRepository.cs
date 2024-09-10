using Microsoft.EntityFrameworkCore;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Models;
using APIBackend.DataModel.DTO;

namespace APIBackEnd.Repository
{
    public interface IProductRepository
    {
        public List<Product> GetAllProducts();
        public ProductModel GetProductById(int id);
        public Product AddNewProduct(CreateProductDTO product);
        public bool DeleteProdcutById(int id);
        public Product UpdateProductById(int id, UpdateProductDTO product);
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

        public Product UpdateProductById(int id, UpdateProductDTO product)
        {
            Product productDataBase = _coreContext.Product.Where(pr => pr.Id == id).FirstOrDefault();
            if (productDataBase == null)
            {
                return null;
            }
            productDataBase.Status = product.Status;
            productDataBase.Name = product.Name;
            productDataBase.CategoryId = product.CategoryId;
            productDataBase.Description = product.Description;

            _coreContext.SaveChanges();
            return productDataBase;
        }

        public Product AddNewProduct(CreateProductDTO newProduct)
        {
            Product product = new Product();
            product.Name= newProduct.Name;
            product.CategoryId = newProduct.CategoryId;
            product.Description = newProduct.Description;
            product.Status = newProduct.Status;

            _coreContext.Product.Add(product);
            _coreContext.SaveChanges(true);
            return product;
        }

    }
}
