using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TestAPI.Data.Enum;

namespace TestAPI.Data
{
    public class GoodsIssueModel //Phieu xuat kho
    {
        public GoodsIssueModel() { }
        public int Id { get; set; }
        public DateTime ImportDate { get; set; }
        public int PartnerId { get; set; }
        public Status IssueStatus { get; set; }
    }
}
