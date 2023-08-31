using ColumnMaintenanceAssesment_BackEnd.Dto.Configurations;
using ColumnMaintenanceAssesment_BackEnd.Models;
using ColumnMaintenanceAssesment_BackEnd.Services;
using ColumnMaintenanceAssesment_BackEnd.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ColumnMaintenanceDbContext>();
builder.Services.AddScoped<TableInterface,TableService>();
builder.Services.AddScoped<ColumnInterface,ColumnServices>();
builder.Services.AddAutoMapper(typeof(MapperConfig));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(option =>
{
    option.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
