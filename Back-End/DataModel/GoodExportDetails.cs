using APIBackEnd.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIBackend.DataModel
{
    public class GoodExportDetails
    {
        [Key]
        public int Id { get; set; }
        public int GoodExportId { get; set; }
        [ForeignKey("GoodExportId")]
        public GoodsExport GoodsExport { get; set; }
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
}
