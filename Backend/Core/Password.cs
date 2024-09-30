namespace Backend.Core;
public class Password
{
    public Guid Id { get; set; }
    public string EncryptedName { get; set; }
    public string EncryptedPassword { get; set; }
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public User? User { get; set; }
    public string UserId { get; set; }
}