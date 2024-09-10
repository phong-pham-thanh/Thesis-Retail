using APIBackend.Models;

namespace APIBackend.DataModel.DTO
{
    public class CreateProductDTO
    {
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; } = true;
    }
}
