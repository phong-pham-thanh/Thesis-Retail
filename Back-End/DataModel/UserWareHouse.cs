using APIBackEnd.Data;

namespace APIBackend.DataModel
{
    public class UserWareHouse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WareHouseId { get; set; }
        public Users User { get; set; }
        public WareHouses WareHouse { get; set; }
    }
}
