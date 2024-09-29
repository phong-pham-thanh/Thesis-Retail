using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIBackEnd.Migrations
{
    public partial class AddForeignKeyForWareHouse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_GoodsReceipt_WareHouseId",
                table: "GoodsReceipt",
                column: "WareHouseId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsExports_WareHouseId",
                table: "GoodsExports",
                column: "WareHouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsExports_WareHouses_WareHouseId",
                table: "GoodsExports",
                column: "WareHouseId",
                principalTable: "WareHouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsReceipt_WareHouses_WareHouseId",
                table: "GoodsReceipt",
                column: "WareHouseId",
                principalTable: "WareHouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoodsExports_WareHouses_WareHouseId",
                table: "GoodsExports");

            migrationBuilder.DropForeignKey(
                name: "FK_GoodsReceipt_WareHouses_WareHouseId",
                table: "GoodsReceipt");

            migrationBuilder.DropIndex(
                name: "IX_GoodsReceipt_WareHouseId",
                table: "GoodsReceipt");

            migrationBuilder.DropIndex(
                name: "IX_GoodsExports_WareHouseId",
                table: "GoodsExports");
        }
    }
}
