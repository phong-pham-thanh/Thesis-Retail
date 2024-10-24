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
        public Users Manager { get; set; }
        public string Address { get; set; }
        public bool Status { get; set; }
        public List<Inventories> Inventories { get; set; }
        public List<GoodsExport> GoodsExports { get; set; }
        public List<GoodsReceipt> GoodsReceipts { get; set; }
        public List<Bill> ListBill { get; set; }
        public List<GoodsTransfer> ListGoodsTransferFrom { get; set; }
        public List<GoodsTransfer> ListGoodsTransferTo { get; set; }
        public List<UserWareHouse> ListUserWareHouse { get; set; }
    }
}
