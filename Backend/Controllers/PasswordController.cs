using Backend.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PasswordController(DatabaseContext context) : ControllerBase
{
    [Authorize(Roles = "User")]
    [HttpGet]
    [Route("/{userId}")]
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
    public async Task<IActionResult> CreatePassword([FromBody] Password password)
    {
        try
        {
            await context.Passwords.AddAsync(password);
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
    [Route("/{userId}")]
    public async Task<IActionResult> DeletePassword([FromRoute] string passwordId, [FromRoute] string userId)
    {
        try
        {
            var passwordToRemove =
                await context.Passwords.FirstOrDefaultAsync(p => p.UserId == userId && p.Id.ToString() == passwordId);

            if (passwordToRemove == null)
            {
                return BadRequest();
            }

            context.Passwords.Remove(passwordToRemove);
            await context.SaveChangesAsync();
            return Created();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}