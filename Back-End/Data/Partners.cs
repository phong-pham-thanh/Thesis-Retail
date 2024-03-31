using System.ComponentModel.DataAnnotations;


namespace TestAPI.Data
{
    public class Partners
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int TotalSale { get; set; }
    }
}
