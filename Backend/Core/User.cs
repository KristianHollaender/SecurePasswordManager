using Microsoft.AspNetCore.Identity;

namespace Backend.Core;

public class User : IdentityUser
{
    public string Salt { get; set; }
    public virtual List<Password> Passwords { get; set; }
}