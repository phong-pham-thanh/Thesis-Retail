using APIBackEnd.Data;

namespace APIBackend.Models
{
    public class GoodReceiptDetailModel
    {
        public int Id { get; set; }
        public int GoodReceiptId { get; set; }
        public GoodsReceipt GoodsReceipt { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int PriceUnit { get; set; }
        public int Quantity { get; set; }
    }
}
