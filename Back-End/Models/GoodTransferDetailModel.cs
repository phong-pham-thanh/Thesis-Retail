using APIBackEnd.Data;
using APIBackend.DataModel;
using System.ComponentModel.DataAnnotations.Schema;
using APIBackEnd.Models;

namespace APIBackend.Models
{
    public class GoodTransferDetailModel
    {
        public int Id { get; set; }
        public int GoodTransferId { get; set; }
        public GoodsTransfer GoodsTransfer { get; set; }
        public int ProductId { get; set; }
        public ProductModel Product { get; set; }
        public int Quantity { get; set; }
    }
}
