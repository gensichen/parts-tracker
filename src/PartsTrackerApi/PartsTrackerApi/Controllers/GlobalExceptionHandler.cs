using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace PartsTrackerApi.Controllers;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "An error occurred: {Message}", exception.Message);

        var problemDetails = new ProblemDetails
        {
            Status = GetStatusCode(exception),
            Title = GetTitle(exception),
            Detail = exception.Message,
            Instance = httpContext.Request.Path
        };

        httpContext.Response.StatusCode = problemDetails.Status.Value;
        
        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        
        return true;
    }

    private static int GetStatusCode(Exception exception) => exception switch
    {
        ArgumentException => (int)HttpStatusCode.BadRequest,
        KeyNotFoundException => (int)HttpStatusCode.NotFound,
        UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized,
        // Add more exception types as needed
        _ => (int)HttpStatusCode.InternalServerError
    };

    private static string GetTitle(Exception exception) => exception switch
    {
        ArgumentException => "Bad Request",
        KeyNotFoundException => "Resource Not Found",
        UnauthorizedAccessException => "Unauthorized",
        // Add more exception types as needed
        _ => "Internal Server Error"
    };
}