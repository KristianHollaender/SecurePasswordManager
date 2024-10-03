using Backend.Core.Dtos;
using Microsoft.AspNetCore.Identity;

namespace Backend.Core.Util;

public class Helper(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
{
    
    public async Task<User> CreateUser(SignUpDto signUpDto)
    {
        var user = new User
        {
            Email = signUpDto.Email,
            UserName = signUpDto.Email,
            EmailConfirmed = true,
            LockoutEnabled = false,
            Salt = signUpDto.Salt,
        };
        var result = await userManager.CreateAsync(user, signUpDto.Password);

        if (!result.Succeeded)
            throw new Exception(string.Join(',', result.Errors));
        
        var newUser = await userManager.FindByEmailAsync(signUpDto.Email);
        return newUser;
    }
    
    public async Task CreateRole(string roleName)
    {
        var role = new IdentityRole(roleName);
        await roleManager.CreateAsync(role);
    }

    public async Task AddUserToRole(User user, string roleName)
    {
        await userManager.AddToRoleAsync(user, roleName);
    }
}