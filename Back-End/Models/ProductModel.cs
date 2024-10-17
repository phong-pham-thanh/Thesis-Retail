using System.ComponentModel.DataAnnotations.Schema;
using APIBackend.DataModel;
using APIBackend.Models;
using APIBackEnd.Data;

namespace APIBackEnd.Models
{
    public class ProductModel
    {
        public ProductModel() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public CategoryModel Category { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public List<InventoryModel> ListInventories { get; set; }
        public List<PriceProductModel> ListPrices { get; set; }
        public int? CurrentPrice { get; set; }

    }
}
