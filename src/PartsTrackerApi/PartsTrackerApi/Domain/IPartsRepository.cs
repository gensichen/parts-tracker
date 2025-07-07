namespace PartsTrackerApi.Domain;

public interface IPartsRepository
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