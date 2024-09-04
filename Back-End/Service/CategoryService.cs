using APIBackend.Models;
using APIBackend.Repository;
using APIBackEnd.Models;

namespace APIBackend.Service
{
    public interface ICategoryService
    {
        public List<CategoryModel> GetAll();
    }
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;

        }
        public List<CategoryModel> GetAll()
        {
            return _categoryRepository.GetAll();
        }
    }
}
