using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestAPI.Data
{
    [Table("Products")]
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int giavon { get; set; }
        public int giaban { get; set; }
        public int slnhap { get; set; }
        public int tonkho { get; set; }
    }
}
