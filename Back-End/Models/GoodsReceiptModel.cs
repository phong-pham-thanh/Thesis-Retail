using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestAPI.Data
{
    public class GoodsReceiptModel //Phieu nhap kho
    {
        public GoodsReceiptModel() { }
        public int Id { get; set; }
        public DateTime ExportDate { get; set; }
        public int PartnerID { get; set; }
        public bool ReceiptStatus { get; set; } = false;
    }
}
