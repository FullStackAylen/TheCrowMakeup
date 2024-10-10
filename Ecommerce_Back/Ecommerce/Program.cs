using Ecommerce.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// config para includes
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    
});

// Configuraci�n de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()  // Permitir cualquier origen
               .AllowAnyMethod()  // Permitir cualquier m�todo (GET, POST, etc.)
               .AllowAnyHeader(); // Permitir cualquier encabezado
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true, // Valida el issuer (emisor del token)
        ValidateAudience = true, // Valida la audiencia
        ValidateLifetime = true, // Valida la expiraci�n del token
        ValidateIssuerSigningKey = true, // Valida la clave de firma del token
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        RoleClaimType = ClaimTypes.Role
    };
});

builder.Services.AddAuthorization();
builder.Services.AddScoped<JwtService>(); // Agrega esto si falta
builder.Services.AddScoped<PasswordService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Usa la pol�tica de CORS
app.UseCors("AllowAllOrigins"); // A�adir esta l�nea antes de usar la autorizaci�n

app.UseAuthorization();

app.MapControllers();

app.Run();
