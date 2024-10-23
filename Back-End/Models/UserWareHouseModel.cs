using APIBackend.Models;
using APIBackEnd.Data;

namespace APIBackEnd.Models
{
    public class UserWareHouseModel
    {
        public UserWareHouseModel() { }
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WareHouseId { get; set; }
        public UserModel UserModel { get; set; }
        public WareHouseModel WareHouseModel { get; set; }
    }
}

