## Architecture Overview

### PartsTracker

The system is built as a parts tracking API with the following key components:

1. **Data Layer**
   - Uses Entity Framework Core as the ORM
   - Implements a DbContext (PartsDbContext) for database operations
   - Uses Code-First approach with entity configurations
   - Includes seed data for initial parts inventory

2. **Domain Model**
   - Core entity: Part
   - Key attributes: PartNumber (PK), Description, QuantityOnHand, LocationCode, LastStockTake
   - Implements inventory tracking with location management

3. **API Layer**
   - RESTful API design
   - Built with ASP.NET Core
   - Provides CRUD operations for parts management

## Trade-offs

1. **ORM Choice (Entity Framework Core)**
   - Pros:
     - Rapid development with built-in migration support
     - Type-safe queries
     - Rich querying capabilities
   - Cons:
     - Potential performance overhead compared to raw SQL
     - Learning curve for complex queries
     - Memory overhead for tracking entities

2. **Data Model Design**
   - Pros:
     - Simple, focused schema
     - Efficient queries with PartNumber as primary key - should ideally be an int though.
   - Cons:
     - Limited historical tracking
     - No built-in audit trail
     - Single-table design may need expansion for complex scenarios

## TODOs
   - Health Check
   - More tests
   - Test out setup doc instructions (how to seed the db, etc).

## Future TODOs
   - Build in resiliency (Circuit Breaking, Rate Limiting, Retries) using Polly.
   - Pipeline integration tests.
   - Helm
   - Monitoring & Dashboards (Grafana or ELK)
   - Implement API authentication using JWT or API keys
   - Implement audit logging for all inventory changes
   - Input validation for all API endpoints
   - Security scanning of containers, OwaspZap
