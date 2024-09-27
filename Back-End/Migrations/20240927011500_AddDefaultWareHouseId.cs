using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIBackEnd.Migrations
{
    public partial class AddDefaultWareHouseId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("" +
                                "SET IDENTITY_INSERT Users ON;" +
                                "IF NOT EXISTS (SELECT 1 FROM Users WHERE id = 1)\r\n" +
                                "BEGIN\r\n" +
                                "INSERT INTO Users (id, Username, Password, Name, Age, Address, Branch, DateOnBoard)\r\n" +
                                "VALUES (1, 'Default', '123', 'Default', 0, 'HCM', '1', '2020-12-12');\r\n" +
                                "END\r\n" +
                                "SET IDENTITY_INSERT Users OFF;\r\n" +
                                "SET IDENTITY_INSERT warehouses ON;" +
                                "IF NOT EXISTS (SELECT 1 FROM warehouses WHERE id = 0)\r\n" +
                                "BEGIN\r\n" +
                                "INSERT INTO warehouses (id, Address, ManagerId, Status)\r\n" +
                                "VALUES (0, 'Default warehouses', 1, 1);\r\n" +
                                "END\r\n" +
                                "SET IDENTITY_INSERT warehouses OFF;\r\n");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
