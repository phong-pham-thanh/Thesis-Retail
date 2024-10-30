﻿// <auto-generated />
using System;
using APIBackEnd.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace APIBackEnd.Migrations
{
    [DbContext(typeof(CoreContext))]
    [Migration("20241030125853_AddDefaultWareHouseForUser")]
    partial class AddDefaultWareHouseForUser
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("APIBackEnd.Data.Categories", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("APIBackEnd.Data.Customers", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("APIBackEnd.Data.GoodsIssue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("ImportDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("IssueStatus")
                        .HasColumnType("int");

                    b.Property<int>("PartnerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("GoodsIssue");
                });

            modelBuilder.Entity("APIBackEnd.Data.GoodsReceipt", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("ImportDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("PartnerId")
                        .HasColumnType("int");

                    b.Property<int>("ReceiptStatus")
                        .HasColumnType("int");

                    b.Property<long?>("TotalAmount")
                        .HasColumnType("bigint");

                    b.Property<int>("WareHouseId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PartnerId");

                    b.HasIndex("WareHouseId");

                    b.ToTable("GoodsReceipt");
                });

            modelBuilder.Entity("APIBackEnd.Data.Partners", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TotalSale")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Partners");
                });

            modelBuilder.Entity("APIBackEnd.Data.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<int?>("CurrentPrice")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImgPath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("APIBackEnd.Data.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("Branch")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOnboard")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DefaultWareHouseId")
                        .HasColumnType("int");

                    b.Property<bool?>("IsAdmin")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DefaultWareHouseId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("APIBackend.DataModel.Bill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int");

                    b.Property<int>("TotalAmount")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("WareHouseId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("UserId");

                    b.HasIndex("WareHouseId");

                    b.ToTable("Bill");
                });

            modelBuilder.Entity("APIBackend.DataModel.BillDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("BillId")
                        .HasColumnType("int");

                    b.Property<int>("PriceUnit")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BillId");

                    b.HasIndex("ProductId");

                    b.ToTable("BillDetails");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodExportDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("GoodExportId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GoodExportId");

                    b.HasIndex("ProductId");

                    b.ToTable("GoodExportDetails");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodReceiptDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("GoodReceiptId")
                        .HasColumnType("int");

                    b.Property<int?>("PriceUnit")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GoodReceiptId");

                    b.HasIndex("ProductId");

                    b.ToTable("GoodReceiptDetails");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodsExport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ExportDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("ExportStatus")
                        .HasColumnType("int");

                    b.Property<int>("WareHouseId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("WareHouseId");

                    b.ToTable("GoodsExports");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodsTransfer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("FromWareHouseId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("ToWareHouseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("TransferDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FromWareHouseId");

                    b.HasIndex("ToWareHouseId");

                    b.HasIndex("UserId");

                    b.ToTable("GoodsTransfers");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodTransferDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("GoodTransferId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GoodTransferId");

                    b.HasIndex("ProductId");

                    b.ToTable("GoodTransferDetails");
                });

            modelBuilder.Entity("APIBackend.DataModel.Inventories", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("WareHouseId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("WareHouseId");

                    b.ToTable("Inventories");
                });

            modelBuilder.Entity("APIBackend.DataModel.PriceProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("PriceProduct");
                });

            modelBuilder.Entity("APIBackend.DataModel.UserWareHouse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("WareHouseId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.HasIndex("WareHouseId");

                    b.ToTable("UserWareHouse");
                });

            modelBuilder.Entity("APIBackend.DataModel.WareHouses", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ManagerId")
                        .HasColumnType("int");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("ManagerId");

                    b.ToTable("WareHouses");
                });

            modelBuilder.Entity("APIBackEnd.Data.GoodsReceipt", b =>
                {
                    b.HasOne("APIBackEnd.Data.Partners", "Partner")
                        .WithMany()
                        .HasForeignKey("PartnerId");

                    b.HasOne("APIBackend.DataModel.WareHouses", "WareHouse")
                        .WithMany("GoodsReceipts")
                        .HasForeignKey("WareHouseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Partner");

                    b.Navigation("WareHouse");
                });

            modelBuilder.Entity("APIBackEnd.Data.Product", b =>
                {
                    b.HasOne("APIBackEnd.Data.Categories", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("APIBackEnd.Data.Users", b =>
                {
                    b.HasOne("APIBackend.DataModel.WareHouses", "DefaultWareHouse")
                        .WithMany("UserUseForDefaultWareHouse")
                        .HasForeignKey("DefaultWareHouseId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("DefaultWareHouse");
                });

            modelBuilder.Entity("APIBackend.DataModel.Bill", b =>
                {
                    b.HasOne("APIBackEnd.Data.Customers", "Customer")
                        .WithMany("ListBill")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("APIBackEnd.Data.Users", "User")
                        .WithMany("ListBill")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("APIBackend.DataModel.WareHouses", "WareHouse")
                        .WithMany("ListBill")
                        .HasForeignKey("WareHouseId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("User");

                    b.Navigation("WareHouse");
                });

            modelBuilder.Entity("APIBackend.DataModel.BillDetails", b =>
                {
                    b.HasOne("APIBackend.DataModel.Bill", "Bill")
                        .WithMany("ListBillDetails")
                        .HasForeignKey("BillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("APIBackEnd.Data.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Bill");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodExportDetails", b =>
                {
                    b.HasOne("APIBackend.DataModel.GoodsExport", "GoodsExport")
                        .WithMany("ListGoodExportDetails")
                        .HasForeignKey("GoodExportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("APIBackEnd.Data.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GoodsExport");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodReceiptDetails", b =>
                {
                    b.HasOne("APIBackEnd.Data.GoodsReceipt", "GoodsReceipt")
                        .WithMany("ListGoodReciptDetails")
                        .HasForeignKey("GoodReceiptId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("APIBackEnd.Data.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GoodsReceipt");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodsExport", b =>
                {
                    b.HasOne("APIBackEnd.Data.Customers", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId");

                    b.HasOne("APIBackend.DataModel.WareHouses", "WareHouse")
                        .WithMany("GoodsExports")
                        .HasForeignKey("WareHouseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("WareHouse");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodsTransfer", b =>
                {
                    b.HasOne("APIBackend.DataModel.WareHouses", "FromWareHouse")
                        .WithMany("ListGoodsTransferFrom")
                        .HasForeignKey("FromWareHouseId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("APIBackend.DataModel.WareHouses", "ToWareHouse")
                        .WithMany("ListGoodsTransferTo")
                        .HasForeignKey("ToWareHouseId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("APIBackEnd.Data.Users", "User")
                        .WithMany("ListGoodsTransfers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("FromWareHouse");

                    b.Navigation("ToWareHouse");

                    b.Navigation("User");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodTransferDetails", b =>
                {
                    b.HasOne("APIBackend.DataModel.GoodsTransfer", "GoodsTransfer")
                        .WithMany("ListGoodTransferDetails")
                        .HasForeignKey("GoodTransferId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("APIBackEnd.Data.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GoodsTransfer");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("APIBackend.DataModel.Inventories", b =>
                {
                    b.HasOne("APIBackEnd.Data.Product", "Product")
                        .WithMany("ListInventories")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("APIBackend.DataModel.WareHouses", "WareHouse")
                        .WithMany("Inventories")
                        .HasForeignKey("WareHouseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("WareHouse");
                });

            modelBuilder.Entity("APIBackend.DataModel.PriceProduct", b =>
                {
                    b.HasOne("APIBackEnd.Data.Product", "Product")
                        .WithMany("ListPrices")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("APIBackend.DataModel.UserWareHouse", b =>
                {
                    b.HasOne("APIBackEnd.Data.Users", "User")
                        .WithMany("ListUserWareHouse")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("APIBackend.DataModel.WareHouses", "WareHouse")
                        .WithMany("ListUserWareHouse")
                        .HasForeignKey("WareHouseId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("WareHouse");
                });

            modelBuilder.Entity("APIBackend.DataModel.WareHouses", b =>
                {
                    b.HasOne("APIBackEnd.Data.Users", "Manager")
                        .WithMany("ListWareHousesManaged")
                        .HasForeignKey("ManagerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Manager");
                });

            modelBuilder.Entity("APIBackEnd.Data.Customers", b =>
                {
                    b.Navigation("ListBill");
                });

            modelBuilder.Entity("APIBackEnd.Data.GoodsReceipt", b =>
                {
                    b.Navigation("ListGoodReciptDetails");
                });

            modelBuilder.Entity("APIBackEnd.Data.Product", b =>
                {
                    b.Navigation("ListInventories");

                    b.Navigation("ListPrices");
                });

            modelBuilder.Entity("APIBackEnd.Data.Users", b =>
                {
                    b.Navigation("ListBill");

                    b.Navigation("ListGoodsTransfers");

                    b.Navigation("ListUserWareHouse");

                    b.Navigation("ListWareHousesManaged");
                });

            modelBuilder.Entity("APIBackend.DataModel.Bill", b =>
                {
                    b.Navigation("ListBillDetails");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodsExport", b =>
                {
                    b.Navigation("ListGoodExportDetails");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodsTransfer", b =>
                {
                    b.Navigation("ListGoodTransferDetails");
                });

            modelBuilder.Entity("APIBackend.DataModel.WareHouses", b =>
                {
                    b.Navigation("GoodsExports");

                    b.Navigation("GoodsReceipts");

                    b.Navigation("Inventories");

                    b.Navigation("ListBill");

                    b.Navigation("ListGoodsTransferFrom");

                    b.Navigation("ListGoodsTransferTo");

                    b.Navigation("ListUserWareHouse");

                    b.Navigation("UserUseForDefaultWareHouse");
                });
#pragma warning restore 612, 618
        }
    }
}
