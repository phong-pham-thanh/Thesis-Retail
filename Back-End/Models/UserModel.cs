using APIBackend.DataModel;
using APIBackEnd.Data;

namespace APIBackEnd.Models
{
    public class UserModel
    {
        public UserModel() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Branch { get; set; }
        public string Address { get; set; }
        public DateTime DateOnboard { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int Age { get; set; }
        public bool? IsAdmin { get; set; }
        public int? DefaultWareHouseId { get; set; }
        public WareHouses DefaultWareHouse { get; set; }
        public List<UserWareHouseModel> ListUserWareHouse { get; set; }

    }
}

