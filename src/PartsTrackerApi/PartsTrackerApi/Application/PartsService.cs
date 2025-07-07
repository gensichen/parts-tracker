using PartsTrackerApi.Domain;

namespace PartsTrackerApi.Application;

public class PartsService : IPartsService
{
    private readonly IPartsRepository _partsRepository;

    public PartsService(IPartsRepository partsRepository)
    {
        _partsRepository = partsRepository;
    }
        
    public async Task<Part> CreatePartAsync(Part part)
    {
        return await _partsRepository.CreatePartAsync(part);
    }

    public async Task<Part?> GetPartByPartNumberAsync(string partNumber)
    {
        return await _partsRepository.GetPartByPartNumberAsync(partNumber);
    }

    public async Task<IEnumerable<Part>> GetAllPartsAsync()
    {
        return await _partsRepository.GetAllPartsAsync();
    }

    public async Task<Part?> UpdatePartAsync(string partNumber, Part part)
    {
        return await _partsRepository.UpdatePartAsync(partNumber, part);
    }

    public async Task<bool> DeletePartAsync(string partNumber)
    {
        return await _partsRepository.DeletePartAsync(partNumber);
    }
}