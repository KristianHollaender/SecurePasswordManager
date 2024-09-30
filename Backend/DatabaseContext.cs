using Backend.Core;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend;

public class DatabaseContext : IdentityDbContext 
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) :
        base(options)
    { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        //User
        builder.Entity<User>()
            .Property(u => u.Id)
            .ValueGeneratedOnAdd();
        
        builder.Entity<User>()
            .HasIndex(u => u.UserName)
            .IsUnique();
        
        //Password
        builder.Entity<Password>()
            .Property(p => p.Id)
            .ValueGeneratedOnAdd();  
        
         builder.Entity<Password>()
            .HasOne(c => c.User)
            .WithMany(u => u.Passwords)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);
         
        base.OnModelCreating(builder);
    }
    
    DbSet<Password> Passwords { get; set; }
}