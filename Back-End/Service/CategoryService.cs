﻿using APIBackend.Models;
using APIBackend.Repository;
using APIBackEnd.Models;

namespace APIBackend.Service
{
    public interface ICategoryService
    {
        public List<CategoryModel> GetAll();
        public CategoryModel GetById(int id);
        public CategoryModel AddNewCategory(CategoryModel categoryModel);
        public CategoryModel UpdateCategory(int id, CategoryModel categoryModel);
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

        public CategoryModel GetById(int id)
        {
            return _categoryRepository.GetById(id);
        }

        public CategoryModel AddNewCategory(CategoryModel categoryModel)
        {
            return _categoryRepository.AddNewCategory(categoryModel);
        }

        public CategoryModel UpdateCategory(int id, CategoryModel categoryModel)
        {
            return _categoryRepository.UpdateCategory(id, categoryModel);
        }

    }
}
