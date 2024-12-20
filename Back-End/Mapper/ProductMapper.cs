﻿using APIBackend.Mapper;
using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Mapper
{
    public interface IProductMapper
    {
        public ProductModel ToModel(Product efObject);
        public Product ToEntity(Product efObject, ProductModel modelObject);
        public List<ProductModel> ToModels(List<Product> efObject);
    }
    public class ProductMapper : IProductMapper
    {
        private readonly ICategoryMapper _categoryMapper;
        private readonly IInventoryMapper _inventoryMapper;
        private readonly IPriceProductMapper _priceProductMapper;
        public ProductMapper(
            ICategoryMapper categoryMapper, 
            IInventoryMapper inventoryMapper,
            IPriceProductMapper priceProductMapper) 
        {
            _categoryMapper = categoryMapper;
            _inventoryMapper = inventoryMapper;
            _priceProductMapper = priceProductMapper;
        }
        public ProductModel ToModel(Product efObject)
        {
            if(efObject == null)
            {
                return null;
            }
            ProductModel modelObject = new ProductModel();
            modelObject.Id = efObject.Id;
            modelObject.Name = efObject.Name;
            modelObject.CategoryId = efObject.CategoryId;
            modelObject.Category = _categoryMapper.ToModel(efObject.Category);
            modelObject.ListInventories = _inventoryMapper.ToModels(efObject.ListInventories);
            modelObject.ListPrices = _priceProductMapper.ToModels(efObject.ListPrices);
            modelObject.Status = efObject.Status;
            modelObject.Description = efObject.Description;
            modelObject.CurrentPrice = efObject.CurrentPrice;
            modelObject.ImgPath = efObject.ImgPath;
            modelObject.Barcode = efObject.Barcode;
            return modelObject;
        }

        public List<ProductModel> ToModels(List<Product> efObjects)
        {
            List<ProductModel> result = new List<ProductModel>();
            foreach (Product item in efObjects)
            {
                ProductModel modelObject = new ProductModel();
                modelObject.Id = item.Id;
                modelObject.Name = item.Name;
                modelObject.CategoryId = item.CategoryId;
                modelObject.Category = _categoryMapper.ToModel(item.Category);
                modelObject.ListInventories = _inventoryMapper.ToModels(item.ListInventories);
                modelObject.ListPrices = _priceProductMapper.ToModels(item.ListPrices);
                modelObject.Status = item.Status;
                modelObject.Description = item.Description;
                modelObject.CurrentPrice = item.CurrentPrice;
                modelObject.ImgPath = item.ImgPath;
                modelObject.Barcode = item.Barcode;
                result.Add(modelObject);
            }
            return result;
        }

        public Product ToEntity(Product efObject, ProductModel modelObject)
        {
            if (modelObject == null)
            {
                return null;
            }
            efObject.Id = modelObject.Id;
            efObject.Name = modelObject.Name;
            efObject.CategoryId = modelObject.CategoryId;
            efObject.Status = modelObject.Status;
            efObject.Description = modelObject.Description;
            efObject.CurrentPrice = modelObject.CurrentPrice;
            efObject.ImgPath = modelObject.ImgPath;
            efObject.Barcode = modelObject.Barcode;
            return efObject;
        }
    }
}
