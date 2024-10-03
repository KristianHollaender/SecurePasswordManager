using System.Security.Claims;
using AutoMapper;
using Backend.Core;
using Backend.Core.Dtos;
using Backend.Core.Helper;
using Backend.Core.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IMapper mapper) : ControllerBase
{
    private readonly Helper _helper = new(userManager, roleManager);
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            return Ok(mapper.Map<IEnumerable<GetUserDto>>(await userManager.Users.ToListAsync()));
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
    
    [HttpPost]
    [Route("sign-up")]
    public async Task<IActionResult> SignUp([FromBody] SignUpDto signUpDto)
    {
        try
        {
            var existingUser = await userManager.FindByEmailAsync(signUpDto.Email);
            
            if (existingUser != null)
            {
                return BadRequest("Email already exists");
            }

            var user = await _helper.CreateUser(signUpDto);
            await _helper.AddUserToRole(user, Roles.User);
            
            return Created("Successfully created",user);
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