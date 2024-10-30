using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIBackEnd.Migrations
{
    public partial class AddDefaultWareHouseForUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DefaultWareHouseId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_DefaultWareHouseId",
                table: "Users",
                column: "DefaultWareHouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_WareHouses_DefaultWareHouseId",
                table: "Users",
                column: "DefaultWareHouseId",
                principalTable: "WareHouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_WareHouses_DefaultWareHouseId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_DefaultWareHouseId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DefaultWareHouseId",
                table: "Users");
        }
    }
}
