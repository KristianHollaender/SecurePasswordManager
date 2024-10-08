using AutoMapper;
using Backend.Core;
using Backend.Core.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PasswordController(DatabaseContext context, IMapper mapper) : ControllerBase
{
    [Authorize(Roles = "User")]
    [HttpGet]
    [Route("{userId}")]
    public async Task<IActionResult> GetPasswords([FromRoute] string userId)
    {
        try
        {
            return Ok(await context.Passwords.Where(p => p.UserId == userId).ToListAsync());
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [Authorize(Roles = "User")]
    [HttpPost]
    public async Task<IActionResult> CreatePassword([FromBody] CreatePasswordDto password)
    {
        try
        {
            await context.Passwords.AddAsync(mapper.Map<Password>(password));
            await context.SaveChangesAsync();
            return Created();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [Authorize(Roles = "User")]
    [HttpDelete]
    [Route("{passwordId}/{userId}")]
    public async Task<IActionResult> DeletePassword([FromRoute] string passwordId, [FromRoute] string userId)
    {
        try
        {
            var guid = Guid.Parse(passwordId);
            var passwordToRemove =
                await context.Passwords.FirstOrDefaultAsync(p => p.UserId == userId && p.Id == guid);

            if (passwordToRemove == null)
            {
                return BadRequest();
            }

            context.Passwords.Remove(passwordToRemove);
            await context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}