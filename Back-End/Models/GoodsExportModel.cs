using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using APIBackend.Models;
using APIBackEnd.Data.Enum;
using Newtonsoft.Json;

namespace APIBackEnd.Models
{
    public class GoodsExportModel
    {
        public int Id { get; set; }
        public DateTime ExportDate { get; set; }
        public int? CustomerId { get; set; }
        public int WareHouseId { get; set; }
        public Status ExportStatus { get; set; }
        [JsonProperty("ListGoodExportDetailsModel")]
        public List<GoodExportDetailModel> ListGoodExportDetailsModel { get; set; }
        public CustomerModel Customer { get; set; }
        public WareHouseModel WareHouse { get; set; }
        public int? CreatedById { get; set; }
        public UserModel CreatedBy { get; set; }
        public int? AcceptedById { get; set; }
        public UserModel AcceptedBy { get; set; }
    }
}
