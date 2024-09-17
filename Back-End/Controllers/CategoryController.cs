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

        [HttpGet]
        [Route("getCategoryById")]
        public CategoryModel GetById(int id)
        {
            return _categoryService.GetById(id);
        }

        [HttpPost]
        [Route("addNewCategory")]
        public CategoryModel AddNewCategory([FromBody] CategoryModel category)
        {
            //{
            //    "name": "string"
            //}
            return _categoryService.AddNewCategory(category);
        }

        [HttpPut]
        [Route("updateCategoryById/{id}")]
        public CategoryModel Put(int id, [FromBody] CategoryModel category)
        {
            //{
            //    "name": "string"
            //}
            return _categoryService.UpdateCategory(id, category);
        }

        [HttpGet]
        [Route("getCategoryBySearchName")]
        public List<CategoryModel> GetBySearchName(string query)
        {
            return _categoryService.GetBySearchName(query);
        }
    }
}
