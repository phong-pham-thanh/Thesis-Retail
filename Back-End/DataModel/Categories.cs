using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIBackEnd.Data
{
    public class Categories
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
