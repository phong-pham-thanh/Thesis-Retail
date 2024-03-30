using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestAPI.Migrations
{
    public partial class AddColumnForProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Inventory",
                table: "Products",
                newName: "tonkho");

            migrationBuilder.AddColumn<int>(
                name: "giaban",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "giavon",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "slnhap",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "giaban",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "giavon",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "slnhap",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "tonkho",
                table: "Products",
                newName: "Inventory");
        }
    }
}
