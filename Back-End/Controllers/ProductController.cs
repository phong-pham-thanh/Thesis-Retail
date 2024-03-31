using Microsoft.AspNetCore.Mvc;
using TestAPI.Models;
using TestAPI.Repository;

namespace TestAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public List<ProductModel> GetAllProduct()
        {
            List<ProductModel> result = _productRepository.GetAllProducts();
            return result;
        }

        [Route("getProductById/{id}")]
        [HttpGet]
        public ProductModel GetProductById(int id)
        {
            ProductModel result = _productRepository.GetProductById(id);
            return result;
        }
    }
}
