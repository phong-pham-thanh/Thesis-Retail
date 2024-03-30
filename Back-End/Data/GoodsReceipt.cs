using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestAPI.Data
{
    public class GoodsReceipt //Phieu nhap kho
    {
        [Key]
        public int Id { get; set; }
        public DateTime ExportDate { get; set; }
        [ForeignKey("Partners.Id")]
        public int PartnerID { get; set; }
        public bool ReceiptStatus { get; set; }
    }
}
