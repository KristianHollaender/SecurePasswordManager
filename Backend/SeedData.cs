using System.Security.Cryptography;
using Backend.Core;
using Backend.Core.Dtos;
using Backend.Core.Helper;
using Backend.Core.Util;
using Microsoft.AspNetCore.Identity;

namespace Backend;

public class SeedData(RoleManager<IdentityRole> roleManager, UserManager<User> userManager, DatabaseContext dbContext)
{
    private readonly Helper _helper = new(userManager, roleManager);
    public async Task PopulateData()
    {
        await dbContext.Database.EnsureDeletedAsync();
        await dbContext.Database.EnsureCreatedAsync();

        #region Create Roles
        await _helper.CreateRole(Roles.User);
        await _helper.CreateRole(Roles.Admin);
        #endregion
        
        #region Create Users
        var admin = await _helper.CreateUser(new SignUpDto{Email = "admin@gmail.com", Password = "String@1234", Salt = "salt"});
        #endregion

        #region Assign Roles
        await _helper.AddUserToRole(admin, Roles.Admin);
        #endregion
        
        await dbContext.SaveChangesAsync();
    }
}