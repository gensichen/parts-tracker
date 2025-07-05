using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PartsTrackerApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parts",
                columns: table => new
                {
                    PartNumber = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    QuantityOnHand = table.Column<int>(type: "integer", nullable: false),
                    LocationCode = table.Column<string>(type: "text", nullable: false),
                    LastStockTake = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parts", x => x.PartNumber);
                });

            migrationBuilder.InsertData(
                table: "Parts",
                columns: new[] { "PartNumber", "Description", "LastStockTake", "LocationCode", "QuantityOnHand" },
                values: new object[,]
                {
                    { "MB1001", "Bolt", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "FP1", 60 },
                    { "MB1002", "Nut", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "FP2", 100 },
                    { "MB1003", "Washer", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "FP2", 75 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parts");
        }
    }
}
