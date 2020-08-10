using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace EF.InDesignTest.App.Models
{
    public class Service
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public string Operation { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
    }
}
