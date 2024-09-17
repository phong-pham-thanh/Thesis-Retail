using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIBackEnd.Migrations
{
    public partial class FixForreinKeyForExportGoods : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoodsExports_Customers_PartnerId",
                table: "GoodsExports");

            migrationBuilder.DropIndex(
                name: "IX_GoodsExports_PartnerId",
                table: "GoodsExports");

            migrationBuilder.DropColumn(
                name: "PartnerId",
                table: "GoodsExports");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsExports_CustomerId",
                table: "GoodsExports",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsExports_Customers_CustomerId",
                table: "GoodsExports",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoodsExports_Customers_CustomerId",
                table: "GoodsExports");

            migrationBuilder.DropIndex(
                name: "IX_GoodsExports_CustomerId",
                table: "GoodsExports");

            migrationBuilder.AddColumn<int>(
                name: "PartnerId",
                table: "GoodsExports",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GoodsExports_PartnerId",
                table: "GoodsExports",
                column: "PartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsExports_Customers_PartnerId",
                table: "GoodsExports",
                column: "PartnerId",
                principalTable: "Customers",
                principalColumn: "Id");
        }
    }
}
