using APIBackEnd.Data;
using APIBackend.DataModel;
using System.ComponentModel.DataAnnotations.Schema;
using APIBackEnd.Models;

namespace APIBackend.Models
{
    public class WareHouseModel
    {
        public int Id { get; set; }
        public int ManagerId { get; set; }
        public UserModel Manager { get; set; }
        public string Address { get; set; }
        public bool Status { get; set; }
        public List<Inventories> Inventories { get; set; }
    }
}
