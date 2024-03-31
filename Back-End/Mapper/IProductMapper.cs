﻿using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Mapper
{
    public interface IProductMapper
    {
        public ProductModel ToModel(Product efObject);
        public Product ToEntity(Product efObject, ProductModel modelObject);
        public List<ProductModel> ToModels(List<Product> efObject);
    }
}
