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
}