using APIBackEnd.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace APIBackend.DataModel
{
    public class GoodTransferDetails
    {
        [Key]
        public int Id { get; set; }
        public int GoodTransferId { get; set; }
        [ForeignKey("GoodTransferId")]
        public GoodsTransfer GoodsTransfer { get; set; }
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
}
