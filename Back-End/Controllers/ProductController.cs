﻿using Microsoft.AspNetCore.Mvc;
using System;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using APIBackend.Service;

namespace APIBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public List<ProductModel> GetAllProduct()
        {
            List<ProductModel> result = _productService.GetAllProducts();
            return result;
        }

        [HttpGet]
        [Route("getAllProductFullInventory")]
        public List<ProductModel> GetAllProductByRole()
        {
            List<ProductModel> result = _productService.GetAllProductFullInventory();
            return result;
        }

        [Route("getProductById/{id}")]
        [HttpGet]
        public ProductModel GetProductById(int id)
        {
            ProductModel result = _productService.GetProductById(id);
            return result;
        }

        [HttpDelete]
        [Route("deleteProductById/{id}")]
        public bool DeleteProductById(int id)
        {
            return _productService.DeleteProdcutById(id);
        }

        [HttpPut]
        [Route("updateProductById/{id}")]
        public ProductModel Put(int id, [FromBody] ProductModel product)
        {
            return _productService.UpdateProductById(id, product);
        }

        [HttpPost]
        [Route("addNewProduct")]
        public ProductModel AddNewProduct ([FromBody] ProductModel product)
        {
            return _productService.AddNewProduct(product);
        }
        
        [HttpGet]
        [Route("getProductBySearchName")]
        public List<ProductModel> GetBySearchName(string query)
        {
            return _productService.GetBySearchName(query);
        }

        [Route("getProductByCategoryId/{cateId}")]
        [HttpGet]
        public List<ProductModel> getProductByCategoryId(int cateId)
        {
            return _productService.GetByCategoryId(cateId);
        }
    }
}
