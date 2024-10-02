using System.ComponentModel.DataAnnotations;
using APIBackend.DataModel;


namespace APIBackEnd.Data
{
    public class Customers
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string? PhoneNumber { get; set; }
        public List<Bill> ListBill { get; set; }
    }
}
