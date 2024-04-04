using Microsoft.AspNetCore.Mvc;
using System;
using APIBackEnd.Models;
using APIBackEnd.Repository;

namespace APIBackEnd.Controllers
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

        [HttpDelete]
        [Route("deleteProductById/{id}")]
        public bool DeleteProductById(int id)
        {
            return _productRepository.DeleteProdcutById(id);
        }

        [HttpPut]
        [Route("updateProductById/{id}")]
        public ProductModel Put(int id, [FromBody] ProductModel product)
        {
            return _productRepository.UpdateProductById(id, product);
        }

        [HttpPost]
        [Route("addNewProduct")]
        public ProductModel addNewProduct ([FromBody] ProductModel product)
        {
            return _productRepository.AddNewProduct(product);
        }
    }
}
