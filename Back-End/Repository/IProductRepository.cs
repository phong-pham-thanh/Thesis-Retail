using TestAPI.Models;

namespace TestAPI.Repository
{
    public interface IProductRepository
    {
        public List<ProductModel> GetAllProducts();
    }
}
