using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackend.Mapper
{
    public interface ICategoryMapper
    {
        public CategoryModel ToModel(Categories efObject);
        public List<CategoryModel> ToModels(List<Categories> efObjects);
        public Categories ToEntity(Categories efObject, CategoryModel modelObject);

    }
    public class CategoryMapper : ICategoryMapper
    {
        public CategoryModel ToModel(Categories efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            CategoryModel modelObject = new CategoryModel();
            modelObject.Id = efObject.Id;
            modelObject.Name = efObject.Name;
            return modelObject;
        }

        public List<CategoryModel> ToModels(List<Categories> efObjects)
        {
            List<CategoryModel> result = new List<CategoryModel>();
            foreach (Categories item in efObjects)
            {
                CategoryModel modelObject = new CategoryModel();
                modelObject.Id = item.Id;
                modelObject.Name = item.Name;
                result.Add(modelObject);
            }
            return result;
        }

        public Categories ToEntity(Categories efObject, CategoryModel modelObject)
        {
            if (modelObject == null)
            {
                return null;
            }
            efObject.Id = modelObject.Id;
            efObject.Name = modelObject.Name;
            return efObject;
        }
    }
}
