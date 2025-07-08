# Use the official .NET Core SDK as a parent image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy everything
COPY . .

# Build and publish
RUN dotnet restore "./PartsTrackerApi/PartsTrackerApi.csproj"
RUN dotnet publish "./PartsTrackerApi/PartsTrackerApi.csproj" -c Release -o out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Expose the port your application will run on
EXPOSE 8080

# Start the application
ENTRYPOINT ["dotnet", "PartsTrackerApi.dll"]