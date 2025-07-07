using Microsoft.AspNetCore.Mvc;
using PartsTrackerApi.Application;
using PartsTrackerApi.Domain;

namespace PartsTrackerApi.Controllers;

[ApiController]
[Route("api/parts")]
public class PartsController : ControllerBase
{
    private readonly IPartsService _partsService;

    public PartsController(IPartsService partsService)
    {
        _partsService = partsService;
    }

    // GET: api/parts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Part>>> GetParts()
    {
        var parts = await _partsService.GetAllPartsAsync();
        return Ok(parts);
    }

    // GET: api/parts/{partNumber}
    [HttpGet("{partNumber}")]
    public async Task<ActionResult<Part>> GetPart(string partNumber)
    {
        var part = await _partsService.GetPartByPartNumberAsync(partNumber);

        if (part == null)
        {
            return NotFound();
        }

        return Ok(part);
    }

    // POST: api/parts
    [HttpPost]
    public async Task<ActionResult<Part>> CreatePart(Part part)
    {
        var createdPart = await _partsService.CreatePartAsync(part);
        return CreatedAtAction(nameof(GetPart), new { partNumber = createdPart.PartNumber }, createdPart);
    }

    // PUT: api/parts/{partNumber}
    [HttpPut("{partNumber}")]
    public async Task<IActionResult> UpdatePart(string partNumber, Part part)
    {
        if (partNumber != part.PartNumber)
        {
            return BadRequest("Part number in URL doesn't match part number in request body");
        }

        var updatedPart = await _partsService.UpdatePartAsync(partNumber, part);

        if (updatedPart == null)
        {
            return NotFound();
        }

        return NoContent();
    }

    // DELETE: api/parts/{partNumber}
    [HttpDelete("{partNumber}")]
    public async Task<IActionResult> DeletePart(string partNumber)
    {
        var result = await _partsService.DeletePartAsync(partNumber);

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
 
    
}