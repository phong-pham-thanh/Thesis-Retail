using APIBackEnd.Data.Enum;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using APIBackEnd.Data;

namespace APIBackend.DataModel
{
    public class Bill
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public Customers Customer { get; set; }
        public int WareHouseId { get; set; }
        [ForeignKey("WareHouseId")]
        public WareHouses WareHouse { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users User { get; set; }
        public int TotalAmount { get; set; }
        public List<BillDetails> ListBillDetails { get; set; }
    }
}
