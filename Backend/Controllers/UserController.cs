using Backend.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(UserManager<User> userManager) : ControllerBase
{
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            return Ok(await userManager.Users.ToListAsync());
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [Authorize(Roles = "Admin")]
    [HttpGet]
    [Route("/{userId}")]
    public async Task<IActionResult> GetUserById([FromRoute] string userId)
    {
        try
        {
            return Ok(await userManager.Users.FirstOrDefaultAsync(a => a.Id == userId));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}