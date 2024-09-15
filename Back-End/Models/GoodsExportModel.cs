using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using APIBackend.Models;
using APIBackEnd.Data.Enum;

namespace APIBackEnd.Models
{
    public class GoodsExportModel
    {
        public int Id { get; set; }
        public DateTime ExportDate { get; set; }
        public int CustomerId { get; set; }
        public Status ExportStatus { get; set; }
        public List<GoodExportDetailModel>? ListGoodExportDetailsModel { get; set; }
        public CustomerModel? Customer { get; set; }
    }
}
