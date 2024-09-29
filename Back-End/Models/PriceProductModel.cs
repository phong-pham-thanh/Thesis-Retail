using APIBackEnd.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using APIBackEnd.Models;

namespace APIBackend.Models
{
    public class PriceProductModel
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Price { get; set; }
        public ProductModel? Product { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Active { get; set; }
    }
}
