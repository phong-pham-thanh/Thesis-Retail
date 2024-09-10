using APIBackEnd.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIBackend.DataModel
{
    public class WareHouses
    {
        [Key]
        public int Id { get; set; }
        public int ManagerId { get; set; }
        [ForeignKey("ManagerId")]
        public Users? Manager { get; set; }
        public string? Address { get; set; }
        public bool Status { get; set; }
        public List<Inventories>? Inventories { get; set; }
    }
}
