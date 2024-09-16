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
    [Migration("20240910155316_UpdateAddressToStringAndNullable")]
    partial class UpdateAddressToStringAndNullable
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
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
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

                    b.Property<DateTime>("ExportDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PartnerId")
                        .HasColumnType("int");

                    b.Property<int>("ReceiptStatus")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PartnerId");

                    b.ToTable("GoodsReceipt");
                });

            modelBuilder.Entity("APIBackEnd.Data.Partners", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TotalSale")
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

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
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
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("Branch")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOnboard")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("APIBackend.DataModel.GoodReceiptDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("GoodReceiptId")
                        .HasColumnType("int");

                    b.Property<int>("PriceUnit")
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
                        .HasForeignKey("PartnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Partner");
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

            modelBuilder.Entity("APIBackend.DataModel.WareHouses", b =>
                {
                    b.HasOne("APIBackEnd.Data.Users", "Manager")
                        .WithMany("WareHousesManaged")
                        .HasForeignKey("ManagerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Manager");
                });

            modelBuilder.Entity("APIBackEnd.Data.GoodsReceipt", b =>
                {
                    b.Navigation("ListGoodReciptDetails");
                });

            modelBuilder.Entity("APIBackEnd.Data.Product", b =>
                {
                    b.Navigation("ListInventories");
                });

            modelBuilder.Entity("APIBackEnd.Data.Users", b =>
                {
                    b.Navigation("WareHousesManaged");
                });

            modelBuilder.Entity("APIBackend.DataModel.WareHouses", b =>
                {
                    b.Navigation("Inventories");
                });
#pragma warning restore 612, 618
        }
    }
}