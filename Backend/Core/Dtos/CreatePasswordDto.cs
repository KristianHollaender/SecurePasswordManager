namespace Backend.Core.Dtos;

public class CreatePasswordDto
{
    public string EncryptedName { get; set; }
    public string EncryptedPassword { get; set; }
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string? Note { get; set; }
    public string UserId { get; set; }
}