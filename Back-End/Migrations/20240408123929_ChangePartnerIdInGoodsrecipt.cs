using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIBackEnd.Migrations
{
    public partial class ChangePartnerIdInGoodsrecipt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoodsReceipt_Partners_PartnersId",
                table: "GoodsReceipt");

            migrationBuilder.DropIndex(
                name: "IX_GoodsReceipt_PartnersId",
                table: "GoodsReceipt");

            migrationBuilder.DropColumn(
                name: "PartnersId",
                table: "GoodsReceipt");

            migrationBuilder.RenameColumn(
                name: "PartnerID",
                table: "GoodsReceipt",
                newName: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsReceipt_PartnerId",
                table: "GoodsReceipt",
                column: "PartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsReceipt_Partners_PartnerId",
                table: "GoodsReceipt",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoodsReceipt_Partners_PartnerId",
                table: "GoodsReceipt");

            migrationBuilder.DropIndex(
                name: "IX_GoodsReceipt_PartnerId",
                table: "GoodsReceipt");

            migrationBuilder.RenameColumn(
                name: "PartnerId",
                table: "GoodsReceipt",
                newName: "PartnerID");

            migrationBuilder.AddColumn<int>(
                name: "PartnersId",
                table: "GoodsReceipt",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GoodsReceipt_PartnersId",
                table: "GoodsReceipt",
                column: "PartnersId");

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsReceipt_Partners_PartnersId",
                table: "GoodsReceipt",
                column: "PartnersId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
