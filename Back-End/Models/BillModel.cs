using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using APIBackend.Models;
using APIBackEnd.Data.Enum;
using APIBackEnd.Models;


namespace APIBackend.Models
{
    public class BillModel
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CustomerId { get; set; }
        public CustomerModel Customer { get; set; }
        public int WareHouseId { get; set; }
        public WareHouseModel WareHouse { get; set; }
        public int TotalAmount { get; set; }
        public int UserId { get; set; }
        public UserModel User { get; set; }
        public List<BillDetailModel> ListBillDetails { get; set; }
    }
}
