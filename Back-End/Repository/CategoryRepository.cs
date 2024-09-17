using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Models;

namespace APIBackend.Repository
{
    public interface ICategoryRepository
    {
        public List<CategoryModel> GetAll();
        public CategoryModel GetById(int id);
        public CategoryModel AddNewCategory(CategoryModel categoryModel);
        public CategoryModel UpdateCategory(int id, CategoryModel categoryModel);
        public List<CategoryModel> GetBySearchName(string query);
    }
    public class CategoryRepository : ICategoryRepository
    {
        private readonly CoreContext _coreContext;
        private readonly ICategoryMapper _categoryMapper;

        public CategoryRepository(CoreContext context, ICategoryMapper categoryMapper)
        {
            _coreContext = context;
            _categoryMapper = categoryMapper;
        }

        public List<CategoryModel> GetAll()
        {
            List<CategoryModel> result = _categoryMapper.ToModels(_coreContext.Categories.ToList());
            return result;
        }

        public CategoryModel GetById(int id)
        {
            return _categoryMapper.ToModel(_coreContext.Categories.Where(ca => ca.Id == id).FirstOrDefault());
        }

        public CategoryModel AddNewCategory(CategoryModel categoryModel)
        {
            Categories efobject = new Categories();
            _categoryMapper.ToEntity(efobject, categoryModel);
            _coreContext.Categories.Add(efobject);
            _coreContext.SaveChanges(true);
            return _categoryMapper.ToModel(efobject);
        }
        public CategoryModel UpdateCategory(int id, CategoryModel categoryModel)
        {
            Categories categoryDataBase = _coreContext.Categories.Where(ca => ca.Id == id).FirstOrDefault();
            if (categoryDataBase == null)
            {
                return null;
            }
            _categoryMapper.ToEntity(categoryDataBase, categoryModel);
            categoryDataBase.Id = id;
            _coreContext.SaveChanges();
            return _categoryMapper.ToModel(categoryDataBase);
        }

        public List<CategoryModel> GetBySearchName(string query)
        {
            return _categoryMapper.ToModels(_coreContext.Categories.Where(ca => ca.Name.ToLower().Contains(query.ToLower())).ToList());
        }

    }
}
