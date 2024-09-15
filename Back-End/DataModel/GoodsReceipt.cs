using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using APIBackend.DataModel;
using APIBackEnd.Data.Enum;

namespace APIBackEnd.Data
{
    public class GoodsReceipt //Phieu nhap kho
    {
        [Key]
        public int Id { get; set; }
        public DateTime ImportDate { get; set; }
        public int PartnerId { get; set; }
        [ForeignKey("PartnerId")]
        public Partners? Partner {get; set;}
        public Status ReceiptStatus { get; set; }
        public List<GoodReceiptDetails>? ListGoodReciptDetails {get; set;}
    }
}
