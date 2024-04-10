using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using APIBackend.Models;
using APIBackEnd.Data.Enum;

namespace APIBackEnd.Data
{
    public class GoodsReceiptModel //Phieu nhap kho
    {
        public GoodsReceiptModel() { }
        public int Id { get; set; }
        public DateTime ExportDate { get; set; }
        public int PartnerID { get; set; }
        public Status ReceiptStatus { get; set; }
        public List<GoodReceiptDetailModel> ListGoodReciptDetailsModel { get; set; }
    }
}
