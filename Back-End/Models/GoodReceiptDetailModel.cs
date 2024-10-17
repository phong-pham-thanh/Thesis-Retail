using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackend.Models
{
    public class GoodReceiptDetailModel
    {
        public int Id { get; set; }
        public int GoodReceiptId { get; set; }
        public GoodsReceiptModel? GoodsReceipt { get; set; }
        public int ProductId { get; set; }
        public ProductModel? Product { get; set; }
        public int? PriceUnit { get; set; }
        public int Quantity { get; set; }
    }
}
