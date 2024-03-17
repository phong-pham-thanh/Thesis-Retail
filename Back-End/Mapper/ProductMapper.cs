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
            modelObject.giaban = efObject.giaban;
            modelObject.giavon = efObject.giavon;
            modelObject.slnhap = efObject.slnhap;
            modelObject.tonkho = efObject.tonkho;
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
                modelObject.giaban = item.giaban;
                modelObject.giavon = item.giavon;
                modelObject.slnhap = item.slnhap;
                modelObject.tonkho = item.tonkho;
                result.Add(modelObject);
            }
            return result;
        }
    }
}
