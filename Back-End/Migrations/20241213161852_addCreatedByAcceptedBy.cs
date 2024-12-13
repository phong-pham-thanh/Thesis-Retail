using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIBackEnd.Migrations
{
    public partial class addCreatedByAcceptedBy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AcceptedById",
                table: "GoodsTransfers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AcceptedById",
                table: "GoodsReceipt",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "GoodsReceipt",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AcceptedById",
                table: "GoodsExports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "GoodsExports",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GoodsTransfers_AcceptedById",
                table: "GoodsTransfers",
                column: "AcceptedById");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsReceipt_AcceptedById",
                table: "GoodsReceipt",
                column: "AcceptedById");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsReceipt_CreatedById",
                table: "GoodsReceipt",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsExports_AcceptedById",
                table: "GoodsExports",
                column: "AcceptedById");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsExports_CreatedById",
                table: "GoodsExports",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsExports_Users_AcceptedById",
                table: "GoodsExports",
                column: "AcceptedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsExports_Users_CreatedById",
                table: "GoodsExports",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsReceipt_Users_AcceptedById",
                table: "GoodsReceipt",
                column: "AcceptedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsReceipt_Users_CreatedById",
                table: "GoodsReceipt",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsTransfers_Users_AcceptedById",
                table: "GoodsTransfers",
                column: "AcceptedById",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoodsExports_Users_AcceptedById",
                table: "GoodsExports");

            migrationBuilder.DropForeignKey(
                name: "FK_GoodsExports_Users_CreatedById",
                table: "GoodsExports");

            migrationBuilder.DropForeignKey(
                name: "FK_GoodsReceipt_Users_AcceptedById",
                table: "GoodsReceipt");

            migrationBuilder.DropForeignKey(
                name: "FK_GoodsReceipt_Users_CreatedById",
                table: "GoodsReceipt");

            migrationBuilder.DropForeignKey(
                name: "FK_GoodsTransfers_Users_AcceptedById",
                table: "GoodsTransfers");

            migrationBuilder.DropIndex(
                name: "IX_GoodsTransfers_AcceptedById",
                table: "GoodsTransfers");

            migrationBuilder.DropIndex(
                name: "IX_GoodsReceipt_AcceptedById",
                table: "GoodsReceipt");

            migrationBuilder.DropIndex(
                name: "IX_GoodsReceipt_CreatedById",
                table: "GoodsReceipt");

            migrationBuilder.DropIndex(
                name: "IX_GoodsExports_AcceptedById",
                table: "GoodsExports");

            migrationBuilder.DropIndex(
                name: "IX_GoodsExports_CreatedById",
                table: "GoodsExports");

            migrationBuilder.DropColumn(
                name: "AcceptedById",
                table: "GoodsTransfers");

            migrationBuilder.DropColumn(
                name: "AcceptedById",
                table: "GoodsReceipt");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "GoodsReceipt");

            migrationBuilder.DropColumn(
                name: "AcceptedById",
                table: "GoodsExports");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "GoodsExports");
        }
    }
}
