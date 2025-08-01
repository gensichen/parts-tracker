using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using PartsTrackerApi.Controllers;
using PartsTrackerApi.Application;
using PartsTrackerApi.Domain;
using PartsTrackerApi.Infrastructure;

namespace PartsTrackerApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddScoped<IPartsRepository, PartsRepository>();
        builder.Services.AddScoped<IPartsService, PartsService>();
        builder.Services.AddDbContext<PartsDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection")));
        
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowReactDev", policy =>
            {
                policy.WithOrigins("http://localhost:5173") // Vite default
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
        
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
        builder.Services.AddProblemDetails();
        
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        
        // health check service.
        builder.Services.AddHealthChecks()
            .AddNpgSql(
                builder.Configuration.GetConnectionString("PostgresConnection"),
                name: "postgresql",
                tags: new[] { "db", "sql", "postgresql" });
        
        var app = builder.Build();

        app.UseExceptionHandler();

        app.UseCors("AllowReactDev");
        
        //HealthCheck Middleware
        app.MapHealthChecks("/api/health", new HealthCheckOptions
        {
            ResponseWriter = async (context, report) =>
            {
                context.Response.ContentType = "application/json";
        
                var response = new
                {
                    Status = report.Status.ToString(),
                    Checks = report.Entries.Select(e => new
                    {
                        Component = e.Key,
                        Status = e.Value.Status.ToString(),
                        Description = e.Value.Description
                    }),
                    TotalDuration = report.TotalDuration
                };

                await JsonSerializer.SerializeAsync(context.Response.Body, response);
            }
        });


        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}