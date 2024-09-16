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

        [HttpPost]
        [Route("addNewCategory")]
        public CategoryModel AddNewCategory([FromBody] CategoryModel category)
        {
            return _categoryService.AddNewCategory(category);
        }

        [HttpPut]
        [Route("updateCategoryById/{id}")]
        public CategoryModel Put(int id, [FromBody] CategoryModel product)
        {
            return _categoryService.UpdateCategory(id, product);
        }
    }
}
