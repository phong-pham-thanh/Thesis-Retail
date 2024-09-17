using System.ComponentModel.DataAnnotations;


namespace APIBackEnd.Data
{
    public class Customers
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
