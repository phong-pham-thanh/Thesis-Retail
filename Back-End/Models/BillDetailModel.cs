using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using APIBackend.Models;
using APIBackEnd.Data.Enum;
using APIBackEnd.Models;


namespace APIBackend.Models
{
    public class BillDetailModel
    {
        public int Id { get; set; }
        public int BillId { get; set; }
        public BillModel Bill { get; set; }
        public int ProductId { get; set; }
        public ProductModel Product { get; set; }
        public int PriceUnit { get; set; }
        public int Quantity { get; set; }
    }
}
