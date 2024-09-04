using APIBackend.Models;
using APIBackend.Service;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using Microsoft.AspNetCore.Mvc;

namespace APIBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public List<CategoryModel> GetAll()
        {
            return _categoryService.GetAll();
        }
    }
}
