using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using PartsTrackerApi.Data;

[ApiController]
[Route("api/[controller]")]
public class PartsController : ControllerBase
{
    private readonly PartsDbContext _context;

    public PartsController(PartsDbContext context)
    {
        _context = context;
    }

    // GET: api/parts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Part>>> GetParts()
    {
        var parts = await _context.Parts.ToListAsync();
        return Ok(parts);
    }
 
    /*
    // GET: api/parts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Part>> GetPart(int id)
    {
        var part = await _context.Parts.FindAsync(id);

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
        _context.Parts.Add(part);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPart), new { id = part.Id }, part);
    }

    // PUT: api/parts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePart(string partNumber, Part part)
    {
        if (partNumber != part.partNumber)
        {
            return BadRequest();
        }

        _context.Entry(part).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PartExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/parts/MB1001
    [HttpDelete("{partNumber}")]
    public async Task<IActionResult> DeletePart(string partNumber)
    {
        var part = await _context.Parts.FindAsync(partNumber);
        if (part == null)
        {
            return NotFound();
        }

        _context.Parts.Remove(part);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PartExists(string partNumber)
    {
        return _context.Parts.Any(e => e.PartNumber == partNumber);
    }
    
    */
}