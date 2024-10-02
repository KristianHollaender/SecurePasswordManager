using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Dtos;

public class SignUpDto
{
    [EmailAddress]
    public string Email { get; set; }
    public string Password { get; set; }
    public string Salt { get; set; }
}