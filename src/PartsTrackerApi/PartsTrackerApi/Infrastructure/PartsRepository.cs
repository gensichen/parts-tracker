using Microsoft.EntityFrameworkCore;
using PartsTrackerApi.Data;
using PartsTrackerApi.Domain;

namespace PartsTrackerApi.Infrastructure;

internal class PartsRepository : IPartsRepository
{
    private readonly PartsDbContext _dbContext;
    
    public PartsRepository(PartsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Part> CreatePartAsync(Part part)
    {
        _dbContext.Parts.Add(part);
        await _dbContext.SaveChangesAsync();
        return part;
    }

    public async Task<Part?> GetPartByPartNumberAsync(string partNumber)
    {
        return await _dbContext.Parts.FindAsync(partNumber);
    }

    public async Task<IEnumerable<Part>> GetAllPartsAsync()
    {
        return await _dbContext.Parts.ToListAsync();
    }

    public async Task<Part?> UpdatePartAsync(string partNumber, Part part)
    {
        var existingPart = await _dbContext.Parts.FindAsync(partNumber);

        if (existingPart == null)
        {
            return null;
        }

        // Update properties
        existingPart.Description = part.Description;
        existingPart.QuantityOnHand = part.QuantityOnHand;
        existingPart.LocationCode = part.LocationCode;
        existingPart.LastStockTake = part.LastStockTake;

        await _dbContext.SaveChangesAsync();
        return existingPart;
    }

    public async Task<bool> DeletePartAsync(string partNumber)
    {
        var part = await _dbContext.Parts.FindAsync(partNumber);

        if (part == null)
        {
            return false;
        }

        _dbContext.Parts.Remove(part);
        await _dbContext.SaveChangesAsync();
        return true;
    }
}