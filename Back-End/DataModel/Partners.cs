using System.ComponentModel.DataAnnotations;


namespace APIBackEnd.Data
{
    public class Partners
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int? TotalSale { get; set; }
    }
}
