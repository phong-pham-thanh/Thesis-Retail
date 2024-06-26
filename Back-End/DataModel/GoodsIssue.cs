﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using APIBackEnd.Data.Enum;

namespace APIBackEnd.Data
{
    [Table("GoodsIssue")]
    public class GoodsIssue // Phieu nhap kho
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Partners")]
        public int PartnerId { get; set; }
        public Status IssueStatus { get; set; }
        public DateTime ImportDate { get; set; }
    }
}