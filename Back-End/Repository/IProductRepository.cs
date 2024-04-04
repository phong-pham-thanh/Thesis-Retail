using APIBackEnd.Models;

namespace APIBackEnd.Repository
{
    public interface IProductRepository
    {
        public List<ProductModel> GetAllProducts();
        public ProductModel GetProductById(int id);
        public ProductModel AddNewProduct(ProductModel product);
        public bool DeleteProdcutById(int id);
        public ProductModel UpdateProductById(int id, ProductModel product);
    }
}
