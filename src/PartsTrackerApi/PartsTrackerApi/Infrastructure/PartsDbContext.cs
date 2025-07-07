using Microsoft.EntityFrameworkCore;
using PartsTrackerApi.Domain;

namespace PartsTrackerApi.Data;

public class PartsDbContext : DbContext
{
    public DbSet<Part> Parts { get; set; }

    public PartsDbContext(DbContextOptions<PartsDbContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Part>().HasKey(p => p.PartNumber);
        
        // Optional: Seed initial data
        modelBuilder.Entity<Part>().HasData(
            new Part { PartNumber = "MB1001", Description = "Bolt", QuantityOnHand = 60, LocationCode = "FP1", LastStockTake = new DateTime(2024, 01, 01, 0, 0, 0, DateTimeKind.Utc) },
            new Part { PartNumber = "MB1002", Description = "Nut", QuantityOnHand = 100, LocationCode = "FP2", LastStockTake = new DateTime(2024, 01, 01, 0, 0, 0, DateTimeKind.Utc) },
            new Part { PartNumber = "MB1003", Description = "Washer", QuantityOnHand = 75, LocationCode = "FP2", LastStockTake = new DateTime(2024, 01, 01, 0, 0, 0, DateTimeKind.Utc) }
        );
    }
}