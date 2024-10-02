using System.Security.Claims;
using AutoMapper;
using Backend.Core;
using Backend.Core.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(UserManager<User> userManager, IMapper mapper) : ControllerBase
{
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            return Ok(mapper.Map<GetUserDto>(await userManager.Users.ToListAsync()));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [Authorize(Roles = "Admin")]
    [HttpGet]
    [Route("{userId}")]
    public async Task<IActionResult> GetUserById([FromRoute] string userId)
    {
        try
        {
            return Ok(mapper.Map<GetUserDto>(await userManager.Users.FirstOrDefaultAsync(a => a.Id == userId)));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [Authorize]
    [HttpGet]
    [Route("me")]
    public async Task<IActionResult> GetCurrentUserInfo()
    {
        // Get the user's claims
        var userId = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;

        // Find the user in the database
        var user = await userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(mapper.Map<GetUserDto>(user));
    }
}