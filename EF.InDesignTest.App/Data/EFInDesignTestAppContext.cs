using EF.InDesignTest.App.Models;
using Microsoft.EntityFrameworkCore;

namespace EF.InDesignTest.App.Data
{
    public class EFInDesignTestAppContext : DbContext
    {
        public EFInDesignTestAppContext (DbContextOptions<EFInDesignTestAppContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Client> Clients { get; set; }

        public DbSet<Service> Services { get; set; }
    }
}
