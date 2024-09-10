using APIBackEnd.Data;
using APIBackend.DataModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIBackend.Models
{
    public class WareHouseModel
    {
        public int Id { get; set; }
        public int ManagerId { get; set; }
        public Users? Manager { get; set; }
        public Address Address { get; set; }
        public bool Status { get; set; }
        public List<Inventories>? Inventories { get; set; }
    }
}
