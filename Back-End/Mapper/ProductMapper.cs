using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Mapper
{
    public class ProductMapper : IProductMapper
    {
        public ProductMapper() { }
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
            modelObject.Category = efObject.Category;
            modelObject.Status = efObject.Status;
            modelObject.Description = efObject.Description;
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
                modelObject.Category = item.Category;
                modelObject.Status = item.Status;
                modelObject.Description = item.Description;
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
            efObject.Category = modelObject.Category;
            efObject.Status = modelObject.Status;
            efObject.Description = modelObject.Description;
            return efObject;
        }
    }
}
