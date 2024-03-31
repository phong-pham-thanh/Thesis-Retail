using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestAPI.Migrations
{
<<<<<<< HEAD:Back-End/Migrations/20240331042137_Partners.cs
    public partial class Partners : Migration
=======
    public partial class Partner_GoodsReceipt : Migration
>>>>>>> origin:Back-End/Migrations/20240328171317_Partner_GoodsReceipt.cs
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Address",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Branch",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOnboard",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
<<<<<<< HEAD:Back-End/Migrations/20240331042137_Partners.cs
                name: "GoodsIssue",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    IssueStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsIssue", x => x.Id);
                });

            migrationBuilder.CreateTable(
=======
>>>>>>> origin:Back-End/Migrations/20240328171317_Partner_GoodsReceipt.cs
                name: "GoodsReceipt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExportDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PartnerID = table.Column<int>(type: "int", nullable: false),
<<<<<<< HEAD:Back-End/Migrations/20240331042137_Partners.cs
                    ReceiptStatus = table.Column<int>(type: "int", nullable: false)
=======
                    ReceiptStatus = table.Column<bool>(type: "bit", nullable: false)
>>>>>>> origin:Back-End/Migrations/20240328171317_Partner_GoodsReceipt.cs
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsReceipt", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Partners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalSale = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partners", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
<<<<<<< HEAD:Back-End/Migrations/20240331042137_Partners.cs
                name: "GoodsIssue");

            migrationBuilder.DropTable(
=======
>>>>>>> origin:Back-End/Migrations/20240328171317_Partner_GoodsReceipt.cs
                name: "GoodsReceipt");

            migrationBuilder.DropTable(
                name: "Partners");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Branch",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DateOnboard",
                table: "Users");
        }
    }
}
