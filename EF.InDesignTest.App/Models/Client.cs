using System.Collections.Generic;

namespace EF.InDesignTest.App.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string CarModel { get; set; }
        public string CarNumber { get; set; }
        public IList<Service> Services { get; set; }
    }
}
