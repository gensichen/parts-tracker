# build.ps1 - Root level build script

Write-Host "🚀 Starting build process..."

# Define paths
$apiPath = ".\src\PartsTrackerApi\PartsTrackerApi\PartsTrackerApi.csproj"
$uiPath = ".\src\PartsTrackerUI\"
$testPath = ".\tests\PartsTrackerApiTests\PartsTrackerApiTests.csproj"

# Step 1: Restore and build the .NET API project
Write-Host "🔧 Building API..."
dotnet restore $apiPath
dotnet build $apiPath --configuration Release

# Step 2: Install dependencies and build the React UI
Write-Host "🧩 Building React UI..."
Set-Location $uiPath
npm install
npm run build
Set-Location ..\..

# Step 3: Run the tests
Write-Host "🧪 Running tests..."
dotnet test $testPath --configuration Release

Write-Host "✅ Build and test complete!"
