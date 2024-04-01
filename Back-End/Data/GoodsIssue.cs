using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TestAPI.Data.Enum;

namespace TestAPI.Data
{
    [Table("GoodsIssue")]
    public class GoodsIssue // Phieu nhap kho
    {
        [Key]
        public int Id { get; set; }
        public int PartnerId { get; set; }
        [ForeignKey("PartnerId")]
        public Partners? Partners { get; set; }
        public Status IssueStatus { get; set; }
        public DateTime ImportDate { get; set; }
    }
}