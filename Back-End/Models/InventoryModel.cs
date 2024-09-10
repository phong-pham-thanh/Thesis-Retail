using APIBackEnd.Data;
using APIBackend.DataModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIBackend.Models
{
    public class InventoryModel
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int WareHouseId { get; set; }
        public int Quantity { get; set; }
        //public Product? Product { get; set; }
        //public WareHouses? WareHouse { get; set; }
    }
}
