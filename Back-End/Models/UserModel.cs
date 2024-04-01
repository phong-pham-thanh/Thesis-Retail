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
        public Address Address { get; set; }
        public DateTime DateOnboard { get; set; }
        public int Age { get; set; }
        
    }
}

