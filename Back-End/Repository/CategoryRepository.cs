using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Mapper;

namespace APIBackend.Repository
{
    public interface ICategoryRepository
    {
        public List<CategoryModel> GetAll();

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
    }
}
