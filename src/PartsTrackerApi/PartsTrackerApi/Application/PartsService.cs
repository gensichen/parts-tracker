using PartsTrackerApi.Domain;
using Ardalis.GuardClauses;

namespace PartsTrackerApi.Application;

public class PartsService : IPartsService
{
    private readonly IPartsRepository _partsRepository;

    public PartsService(IPartsRepository partsRepository)
    {
        Guard.Against.Null(partsRepository);
        _partsRepository = partsRepository;
    }
        
    public async Task<Part> CreatePartAsync(Part part)
    {
        Guard.Against.Null(part);
        return await _partsRepository.CreatePartAsync(part);
    }

    public async Task<Part?> GetPartByPartNumberAsync(string partNumber)
    {
        Guard.Against.NullOrWhiteSpace(partNumber, nameof(partNumber));
        return await _partsRepository.GetPartByPartNumberAsync(partNumber);
    }

    public async Task<IEnumerable<Part>> GetAllPartsAsync()
    {
        return await _partsRepository.GetAllPartsAsync();
    }

    public async Task<Part?> UpdatePartAsync(string partNumber, Part part)
    {
        Guard.Against.NullOrWhiteSpace(partNumber, nameof(partNumber));
        Guard.Against.Null(part);

        return await _partsRepository.UpdatePartAsync(partNumber, part);
    }

    public async Task<bool> DeletePartAsync(string partNumber)
    {
        Guard.Against.NullOrWhiteSpace(partNumber, nameof(partNumber));
        return await _partsRepository.DeletePartAsync(partNumber);
    }
}