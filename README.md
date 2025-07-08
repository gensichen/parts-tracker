# Parts-Tracker
A modern web application for tracking parts inventory and management.
![Parts Tracker UI Home Screen.png](docs/Parts%20Tracker%20UI%20Home%20Screen.png)

## Setup Instructions
1. **Prerequisites**
    - Node.js (Latest LTS version)
    - npm package manager
    - Git
    - .NET 8
    - Docker
   

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]
   
   # Navigate to the project directory
   cd parts-tracker
   
   # Install dependencies for the UI
   cd src/PartsTrackerUI
   npm install
   ```

3. **Development Environment Setup**
   ```bash
   # Start the UI development server
   cd src/PartsTrackerUI
   npm run dev
   
   # In a separate terminal, start the API server
   cd src/PartsTrackerApi
   dotnet run PartTrackerApi/PartsTrackerApi.csproj
   ```


## System Architecture Diagram
![PartsTracker-System Diagram.drawio.png](docs/PartsTracker-System%20Diagram.drawio.png)

## Rationale
The Parts-Tracker application is designed with the following key principles:

1. **Modern Stack**
    - Frontend
        - Built with React 19.1.0 for a robust and efficient frontend
        - Utilizes Ant Design components for consistent UI/UX
    - Backend
        - .NET8 Web API
        - PostgreSQL
        - NUnit 
   

2. **Maintainable Architecture**
    - Separate frontend (PartsTrackerUI) and backend (PartsTrackerApi) components
    - Clear project structure with dedicated directories for:
        - `/src` - Source code
        - `/docs` - Documentation
        - `/tests` - Test suites
        - `/infra` - Infrastructure configuration
        - `/.github` - GitHub workflows and configurations
      

3. **Development Experience**
    - Uses Vite 7.0.0 for fast development and building
    - Supports containerization.
    - Clean Architecture for Service Layer.
   

4. **Testing and Quality**
    - Dedicated test directory for maintaining test suites
    - Infrastructure as code for consistent deployments
    - Use of Guard clauses.
    - Use of Fluent Assertions and NSubstitute.

For detailed technical decisions and trade-offs, please refer to [SOLUTION.md](SOLUTION.md).

