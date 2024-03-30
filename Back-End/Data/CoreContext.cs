using Microsoft.EntityFrameworkCore;

namespace TestAPI.Data
{
    public class CoreContext : DbContext
    {
        public CoreContext(DbContextOptions<CoreContext> opt) :base(opt)
        { 
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<GoodsReceipt> GoodsReceipt { get; set; }
        public DbSet<Partners> Partners { get; set; }
    }
}
