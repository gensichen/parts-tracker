using PartsTrackerApi.Domain;

namespace PartsTrackerApi.Application;

public interface IPartsService
{
    // Create
    Task<Part> CreatePartAsync(Part part);
    
    // Read
    Task<Part?> GetPartByPartNumberAsync(string partNumber);
    Task<IEnumerable<Part>> GetAllPartsAsync();
    
    // Update
    Task<Part?> UpdatePartAsync(string partNumber, Part part);
    
    // Delete
    Task<bool> DeletePartAsync(string partNumber);
}