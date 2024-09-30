using Microsoft.AspNetCore.Identity;

namespace Backend.Core;

public class User : IdentityUser
{
    public virtual List<Password> Passwords { get; set; }
}