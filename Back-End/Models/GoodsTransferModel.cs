using APIBackEnd.Data;
using APIBackend.DataModel;
using APIBackEnd.Data.Enum;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using APIBackEnd.Models;

namespace APIBackend.Models
{
    public class GoodsTransferModel
    {
        public int Id { get; set; }
        public DateTime TransferDate { get; set; }
        public int FromWareHouseId { get; set; }
        public WareHouseModel FromWareHouse { get; set; }
        public int ToWareHouseId { get; set; }
        public WareHouseModel ToWareHouse { get; set; }
        public int UserId { get; set; }
        public UserModel User { get; set; }
        public Status Status { get; set; }
        public List<GoodTransferDetailModel> ListGoodTransferDetailsModel { get; set; }
    }
}
