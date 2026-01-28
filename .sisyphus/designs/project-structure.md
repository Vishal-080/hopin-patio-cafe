# Cafe Backend Project Structure

## Directory Structure

```
cafe-backend/
├── src/
│   ├── controllers/          # Route handlers
│   │   ├── auth.controller.js
│   │   ├── menu.controller.js
│   │   ├── orders.controller.js
│   │   ├── reservations.controller.js
│   │   ├── users.controller.js
│   │   ├── staff.controller.js
│   │   ├── inventory.controller.js
│   │   └── analytics.controller.js
│   │
│   ├── models/              # Mongoose schemas
│   │   ├── User.js
│   │   ├── MenuItem.js
│   │   ├── MenuCategory.js
│   │   ├── Order.js
│   │   ├── Reservation.js
│   │   ├── TableAvailability.js
│   │   ├── StaffProfile.js
│   │   ├── InventoryItem.js
│   │   ├── InventoryTransaction.js
│   │   ├── InventoryCategory.js
│   │   ├── CafeSettings.js
│   │   └── DailyReport.js
│   │
│   ├── routes/              # Express route definitions
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── menu.routes.js
│   │   ├── orders.routes.js
│   │   ├── reservations.routes.js
│   │   ├── users.routes.js
│   │   ├── staff.routes.js
│   │   ├── inventory.routes.js
│   │   └── analytics.routes.js
│   │
│   ├── middleware/          # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── authorization.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── error.middleware.js
│   │   ├── rate-limit.middleware.js
│   │   └── logging.middleware.js
│   │
│   ├── services/            # Business logic services
│   │   ├── auth.service.js
│   │   ├── email.service.js
│   │   ├── payment.service.js
│   │   ├── inventory.service.js
│   │   ├── analytics.service.js
│   │   ├── notification.service.js
│   │   └── file-upload.service.js
│   │
│   ├── utils/               # Utility functions
│   │   ├── database.js
│   │   ├── logger.js
│   │   ├── validators.js
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── responses.js
│   │
│   ├── config/              # Configuration files
│   │   ├── database.config.js
│   │   ├── jwt.config.js
│   │   ├── email.config.js
│   │   ├── upload.config.js
│   │   └── cors.config.js
│   │
│   └── app.js               # Express app setup
│
├── tests/                   # Test files
│   ├── unit/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   └── utils/
│   ├── integration/
│   │   ├── auth.test.js
│   │   ├── orders.test.js
│   │   └── reservations.test.js
│   ├── fixtures/            # Test data
│   └── setup.js            # Test setup
│
├── docs/                    # Documentation
│   ├── api/                 # API documentation
│   ├── deployment/          # Deployment guides
│   └── development/         # Development guides
│
├── scripts/                 # Utility scripts
│   ├── seed.js             # Database seeding
│   ├── migrate.js          # Data migration
│   └── backup.js           # Database backup
│
├── uploads/                 # File uploads (images, etc.)
│   ├── menu-items/
│   ├── profiles/
│   └── temp/
│
├── .env.example             # Environment variables template
├── .env                     # Environment variables (gitignored)
├── .gitignore
├── package.json
├── package-lock.json
├── server.js                # Server entry point
├── README.md
└── Dockerfile               # Docker configuration
```

## File Organization Principles

### 1. Separation of Concerns
- **Controllers**: Handle HTTP requests/responses only
- **Services**: Contain business logic and data processing
- **Models**: Define data structure and validation
- **Routes**: Define API endpoints and middleware chain

### 2. Modular Structure
- Each feature has its own controller, service, and routes
- Shared utilities in `/utils`
- Configuration centralized in `/config`

### 3. Test Organization
- **Unit tests**: Test individual functions/classes
- **Integration tests**: Test API endpoints and database interactions
- **Fixtures**: Reusable test data

## Key Files and Their Responsibilities

### `server.js` - Entry Point
```javascript
// Server initialization
// Database connection
// Express app setup
// Middleware configuration
// Route mounting
// Error handling
// Server startup
```

### `src/app.js` - Express App Configuration
```javascript
// Express app instance
// Middleware setup (CORS, body-parser, etc.)
// Route mounting
// Error handler registration
```

### `src/controllers/` - Request Handlers
Each controller follows this pattern:
```javascript
// Controller function
// Input validation
// Business logic delegation to services
// Response formatting
// Error handling
```

### `src/services/` - Business Logic
Each service contains:
```javascript
// Core business logic
// Database operations
// External API calls
// Data transformation
// Business rule validation
```

### `src/models/` - Data Models
Each model defines:
```javascript
// Mongoose schema
// Validation rules
// Virtual fields
// Instance methods
// Static methods
// Middleware (pre/post hooks)
```

### `src/middleware/` - Custom Middleware
- **Authentication**: JWT token verification
- **Authorization**: Role-based access control
- **Validation**: Input data validation
- **Error Handling**: Centralized error processing
- **Logging**: Request/response logging
- **Rate Limiting**: API rate limiting

## Development Workflow

### 1. Feature Development
1. Create/update model in `/src/models/`
2. Implement business logic in `/src/services/`
3. Create controller in `/src/controllers/`
4. Define routes in `/src/routes/`
5. Write tests in `/tests/`
6. Update documentation

### 2. Code Organization Rules
- **One file per feature**: Don't mix unrelated functionality
- **Consistent naming**: Use descriptive names following conventions
- **Export patterns**: Use named exports for utilities, default for main exports
- **Dependency injection**: Pass dependencies to services for testability

### 3. Import/Export Patterns
```javascript
// Named exports for utilities
export const validateEmail = (email) => { /* ... */ };
export const hashPassword = (password) => { /* ... */ };

// Default export for main classes/functions
export default class UserService { /* ... */ }

// Barrel exports for clean imports
// controllers/index.js
export { default as authController } from './auth.controller.js';
export { default as menuController } from './menu.controller.js';
```

## Configuration Management

### Environment-Based Configuration
```javascript
// src/config/index.js
const config = {
  development: {
    database: process.env.DEV_DB_URL,
    jwtSecret: process.env.DEV_JWT_SECRET,
    port: process.env.DEV_PORT || 3001
  },
  production: {
    database: process.env.PROD_DB_URL,
    jwtSecret: process.env.PROD_JWT_SECRET,
    port: process.env.PROD_PORT || 3001
  },
  test: {
    database: process.env.TEST_DB_URL,
    jwtSecret: process.env.TEST_JWT_SECRET,
    port: process.env.TEST_PORT || 3002
  }
};

export default config[process.env.NODE_ENV || 'development'];
```

## Security Considerations

### File Structure Security
- **Sensitive files**: `.env`, `.gitignore` properly configured
- **Upload directory**: Separate from source code, proper permissions
- **Logs**: Stored outside web root, rotation configured
- **Backups**: Automated, stored securely

### Access Control
- **API routes**: Protected by authentication middleware
- **Static files**: Served through controlled middleware
- **Admin endpoints**: Additional authorization checks

## Scalability Considerations

### Modular Architecture
- **Microservice-ready**: Clear separation allows easy extraction
- **Feature flags**: Environment-based feature toggling
- **Database sharding**: Models designed for potential sharding

### Performance Optimization
- **Lazy loading**: Services loaded only when needed
- **Caching layers**: Redis integration points identified
- **Background jobs**: Separate worker processes for heavy tasks

This structure provides a solid foundation for a scalable, maintainable cafe backend system that can grow with the business needs.