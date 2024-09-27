using APIBackend.DataModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIBackEnd.Data
{
    [Table("Products")]
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Categories? Category { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public List<Inventories> ListInventories { get; set; }
        public List<PriceProduct> ListPrices { get; set; }
    }
}
