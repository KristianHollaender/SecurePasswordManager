namespace Backend.Core.Dtos;

public class GetUserDto
{
    public string Id { get; set; }
    public string Salt { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
}