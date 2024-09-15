using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using APIBackend.Models;
using APIBackEnd.Data.Enum;

namespace APIBackEnd.Data
{
    public class GoodsReceiptModel //Phieu nhap kho
    {
        public int Id { get; set; }
        public DateTime ImportDate { get; set; }
        public int PartnerID { get; set; }
        public Status ReceiptStatus { get; set; }
        public List<GoodReceiptDetailModel>? ListGoodReciptDetailsModel { get; set; }
    }
}
