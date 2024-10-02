using AutoMapper;
using Backend;
using Backend.Core;
using Backend.Core.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DatabaseContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("AppDB");
    options.UseSqlite(connectionString);
    //options.UseSqlite("Data Source=./db.sqlite");
});

builder.Services.AddScoped<SeedData>();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

var mapper = new MapperConfiguration(options =>
{
    // Entity to DTO
    // User
    options.CreateMap<User, GetUserDto>();

}).CreateMapper();

builder.Services.AddSingleton(mapper);

builder.Services.AddIdentityApiEndpoints<User>(options =>
    {
        options.SignIn.RequireConfirmedAccount = false;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<DatabaseContext>();

var app = builder.Build();

app.UseCors(static x => x
    .AllowAnyHeader()
    .AllowAnyOrigin()
    .AllowAnyMethod()
);

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<SeedData>().PopulateData().Wait();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapIdentityApi<User>();

app.Run();