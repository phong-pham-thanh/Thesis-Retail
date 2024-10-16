using APIBackend.DataModel;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIBackEnd.Data
{
    [Table("Users")]
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string  Password { get; set; }
        public string Name { get; set; }

        public string Branch { get; set; }
        public DateTime DateOnboard { get; set; }
        public string Address { get; set; }
        public int Age { get; set; }
        public List<WareHouses> WareHousesManaged { get; set; }
        public List<Bill> ListBill { get; set; }
        public List<GoodsTransfer> ListGoodsTransfers { get; set; }
    }
    public enum Address
    {
        City,
        District,
        Street
    }
}
