using System.ComponentModel.DataAnnotations.Schema;
using APIBackEnd.Data;

namespace APIBackEnd.Models
{
    public class ProductModel
    {
        public ProductModel() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public Categories? Category { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }

    }
}
