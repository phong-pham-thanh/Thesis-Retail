using System.ComponentModel.DataAnnotations;


namespace TestAPI.Data
{
    public class PartnerModel
    {
        public PartnerModel() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public int TotalSale { get; set; }
    }
}
