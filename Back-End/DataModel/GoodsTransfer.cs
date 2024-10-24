using APIBackEnd.Data.Enum;
using APIBackEnd.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace APIBackend.DataModel
{
    public class GoodsTransfer
    {
        [Key]
        public int Id { get; set; }
        public DateTime TransferDate { get; set; }
        public int FromWareHouseId { get; set; }
        [ForeignKey("FromWareHouseId")]
        public WareHouses FromWareHouse { get; set; }
        public int ToWareHouseId { get; set; }
        [ForeignKey("ToWareHouseId")]
        public WareHouses ToWareHouse { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users User { get; set; }
        public Status Status { get; set; }
        public List<GoodTransferDetails> ListGoodTransferDetails { get; set; }
    }
}
