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
        public List<ProductModel> GetAll()
        {
            List<ProductModel> temp = _productRepository.GetAllProducts();
            return temp;
        }
    }
}
