using APIBackEnd.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIBackend.DataModel
{
    public class GoodReceiptDetails
    {
        [Key]
        public int Id { get; set; }
        public int GoodReceiptId { get; set; }
        [ForeignKey("GoodReceiptId")]
        public GoodsReceipt GoodsReceipt { get; set; }
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public int PriceUnit { get; set; }
        public int Quantity { get; set; }
    }
}
