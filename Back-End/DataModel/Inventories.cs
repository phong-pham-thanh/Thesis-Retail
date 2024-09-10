using APIBackEnd.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIBackend.DataModel
{
    public class Inventories
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int WareHouseId { get; set; }
        public int Quantity { get; set; }
        [ForeignKey("ProductId")]
        public Product? Product { get; set; }
        [ForeignKey("WareHouseId")]
        public WareHouses? WareHouse { get; set; }
    }
}
