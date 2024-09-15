using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackend.Models
{
    public class GoodExportDetailModel
    {
        public int Id { get; set; }
        public int GoodExportId { get; set; }
        public GoodsExportModel? GoodsExport { get; set; }
        public int ProductId { get; set; }
        public ProductModel? Product { get; set; }
        public int Quantity { get; set; }
    }
}
