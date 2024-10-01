using APIBackEnd.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace APIBackend.DataModel
{
    public class BillDetails
    {
        [Key]
        public int Id { get; set; }
        public int BillId { get; set; }
        [ForeignKey("BillId")]
        public Bill Bill { get; set; }
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public int PriceUnit { get; set; }
        public int Quantity { get; set; }
    }
}
