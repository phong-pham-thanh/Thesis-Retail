using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TestAPI.Data.Enum;

namespace TestAPI.Data
{
    public class GoodsReceipt //Phieu nhap kho
    {
        [Key]
        public int Id { get; set; }
        public int PartnerId { get; set; }
        [ForeignKey("PartnerId")]
        public Partners? Partners { get; set; }
        public DateTime ExportDate { get; set; }
        public Status ReceiptStatus { get; set; }
    }
}
