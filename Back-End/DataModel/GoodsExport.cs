using APIBackEnd.Data.Enum;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using APIBackEnd.Data;

namespace APIBackend.DataModel
{
    public class GoodsExport //Phieu xuat kho
    {
        [Key]
        public int Id { get; set; }
        public DateTime ExportDate { get; set; }
        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public Customers? Customer { get; set; }
        public int WareHouseId { get; set; }
        [ForeignKey("WareHouseId")]
        public WareHouses? WareHouse { get; set; }
        public Status ExportStatus { get; set; }
        public List<GoodExportDetails>? ListGoodExportDetails { get; set; }
    }
}
