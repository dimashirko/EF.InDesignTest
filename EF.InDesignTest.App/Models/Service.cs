using System; 

namespace EF.InDesignTest.App.Models
{
    public class Service
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; }
        public string Operation { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
    }
}
