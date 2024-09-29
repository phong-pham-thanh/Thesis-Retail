using APIBackEnd.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace APIBackend.DataModel
{
    public class PriceProduct
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Price { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Active { get; set; }
    }
}
