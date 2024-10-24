using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIBackEnd.Migrations
{
    public partial class AddGoodTransferTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GoodsTransfers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransferDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FromWareHouseId = table.Column<int>(type: "int", nullable: false),
                    ToWareHouseId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsTransfers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsTransfers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GoodsTransfers_WareHouses_FromWareHouseId",
                        column: x => x.FromWareHouseId,
                        principalTable: "WareHouses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GoodsTransfers_WareHouses_ToWareHouseId",
                        column: x => x.ToWareHouseId,
                        principalTable: "WareHouses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GoodTransferDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GoodTransferId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodTransferDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodTransferDetails_GoodsTransfers_GoodTransferId",
                        column: x => x.GoodTransferId,
                        principalTable: "GoodsTransfers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GoodTransferDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GoodsTransfers_FromWareHouseId",
                table: "GoodsTransfers",
                column: "FromWareHouseId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsTransfers_ToWareHouseId",
                table: "GoodsTransfers",
                column: "ToWareHouseId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsTransfers_UserId",
                table: "GoodsTransfers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodTransferDetails_GoodTransferId",
                table: "GoodTransferDetails",
                column: "GoodTransferId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodTransferDetails_ProductId",
                table: "GoodTransferDetails",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GoodTransferDetails");

            migrationBuilder.DropTable(
                name: "GoodsTransfers");
        }
    }
}
