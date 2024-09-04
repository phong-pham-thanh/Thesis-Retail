using APIBackend.DataModel;
using Microsoft.EntityFrameworkCore;

namespace APIBackEnd.Data
{
    public class CoreContext : DbContext
    {
        public CoreContext(DbContextOptions<CoreContext> opt) : base(opt)
        { 
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Partners> Partners { get; set; }
        public DbSet<GoodsReceipt> GoodsReceipt { get; set; }
        public DbSet<GoodReceiptDetails> GoodReceiptDetails { get; set; }
        public DbSet<WareHouses> WareHouses { get; set; }
        public DbSet<Inventories> Inventories { get; set; }
        public DbSet<GoodsIssue> GoodsIssue { get; set; }
        public DbSet<Categories> Categories { get; set; }
    }
}

