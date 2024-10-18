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
        public DbSet<Customers> Customers { get; set; }
        public DbSet<GoodsExport> GoodsExports { get; set; }
        public DbSet<GoodExportDetails> GoodExportDetails { get; set; }
        public DbSet<PriceProduct> PriceProduct { get; set; }
        public DbSet<Bill> Bill { get; set; }
        public DbSet<BillDetails> BillDetails { get; set; }
        public DbSet<GoodsTransfer> GoodsTransfers { get; set; }
        public DbSet<GoodTransferDetails> GoodTransferDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bill>()
                .HasOne(b => b.Customer)
                .WithMany(c => c.ListBill)
                .HasForeignKey(b => b.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Bill>()
                .HasOne(b => b.WareHouse)
                .WithMany(w => w.ListBill)
                .HasForeignKey(b => b.WareHouseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Bill>()
                .HasOne(b => b.User)
                .WithMany(u => u.ListBill)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GoodsTransfer>()
                .HasOne(gt => gt.FromWareHouse)
                .WithMany(w => w.ListGoodsTransferFrom) 
                .HasForeignKey(gt => gt.FromWareHouseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GoodsTransfer>()
                .HasOne(gt => gt.ToWareHouse)
                .WithMany(w => w.ListGoodsTransferTo)
                .HasForeignKey(gt => gt.ToWareHouseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GoodsTransfer>()
                .HasOne(gt => gt.User)
                .WithMany(w => w.ListGoodsTransfers)
                .HasForeignKey(gt => gt.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }
    }
}

