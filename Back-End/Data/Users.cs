﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestAPI.Data
{
    [Table("Users")]
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string  Password { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
    }
}
