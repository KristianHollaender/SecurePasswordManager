using Backend.Core;
using Backend.Core.Helper;
using Microsoft.AspNetCore.Identity;

namespace Backend;

public class SeedData(RoleManager<IdentityRole> roleManager, UserManager<User> userManager, DatabaseContext dbContext)
{
    public async Task PopulateData()
    {
        await dbContext.Database.EnsureDeletedAsync();
        await dbContext.Database.EnsureCreatedAsync();

        #region Create Roles
        await CreateRole(Roles.User);
        await CreateRole(Roles.Admin);
        #endregion
        
        #region Create Users
        var user = await CreateUser("User", "String@1234");
        var admin = await CreateUser("Admin", "String@1234");
        #endregion

        #region Assign Roles
        await AddUserToRole(user, Roles.User);
        await AddUserToRole(admin, Roles.Admin);
        #endregion
        
        await dbContext.SaveChangesAsync();
    }

    private async Task<User> CreateUser(string username, string password)
    {
        var user = new User()
        {
            Email = username,
            UserName = username,
            EmailConfirmed = true,
            LockoutEnabled = false
        };
        var result = await userManager.CreateAsync(user, password);

        if (!result.Succeeded)
            throw new Exception(string.Join(',', result.Errors));
        
        var newUser = await userManager.FindByNameAsync(username);
        return newUser;
    }
    
    private async Task CreateRole(string roleName)
    {
        var role = new IdentityRole(roleName);
        await roleManager.CreateAsync(role);
    }

    private async Task AddUserToRole(User user, string roleName)
    {
        await userManager.AddToRoleAsync(user, roleName);
    }
}