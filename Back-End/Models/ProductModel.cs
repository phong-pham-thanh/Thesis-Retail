using System.ComponentModel.DataAnnotations.Schema;
using TestAPI.Data;

namespace TestAPI.Models
{
    public class ProductModel
    {
        public ProductModel() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public Categories Category { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }

    }
}
