using TestAPI.Models;

namespace TestAPI.Repository
{
    public interface IProductRepository
    {
        public List<ProductModel> GetAllProducts();
        public ProductModel GetProductById(int id);
        public bool DeleteProdcutById(int id);
        public ProductModel UpdateProductById(int id, ProductModel product);
    }
}
