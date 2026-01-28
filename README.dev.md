# Development Environment Setup

This project includes a complete Docker-based development environment with hot reload support.

## Quick Start

```bash
# Start the development environment
docker-compose -f docker-compose.dev.yml up --build -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop the environment
docker-compose -f docker-compose.dev.yml down
```

## Services

| Service | URL | Description |
|----------|-----|-------------|
| Frontend | http://localhost:5173 | React development server with hot reload |
| Backend API | http://localhost:3000 | Node.js/Express API with nodemon |
| MongoDB | localhost:27017 | Database with authentication |
| Redis | localhost:6379 | Caching and session storage |

## Development Features

### Frontend
- **Hot Reload**: Changes to React components automatically refresh the browser
- **Volume Mount**: `./Frontend` is mounted to `/app` in container
- **Dependencies**: `@heroicons/react` pre-installed

### Backend
- **Auto-restart**: Nodemon watches for file changes and restarts server
- **Volume Mount**: `./Backend` is mounted to `/app` in container
- **Development Mode**: Debug logging enabled
- **Database**: Connects to MongoDB container with authentication

### Database
- **Persistent Data**: MongoDB and Redis data persist across container restarts
- **Authentication**: MongoDB uses `admin:password123` credentials
- **Initialization**: Database automatically initializes with cafe-backend database

## Environment Variables

Development environment uses `./.env.dev` file. Key variables:

```env
NODE_ENV=development
MONGODB_URI=mongodb://admin:password123@mongodb:27017/cafe-backend?authSource=admin
REDIS_URL=redis://redis:6379
JWT_SECRET=dev-jwt-secret-key-for-development-only-not-secure
VITE_API_URL=http://localhost:3000/api/v1
```

## Development Workflow

1. **Make Changes**: Edit files in `./Frontend` or `./Backend` directories
2. **Auto-reload**: 
   - Frontend: Browser automatically refreshes
   - Backend: Server automatically restarts
3. **Debug**: Check container logs with `docker-compose -f docker-compose.dev.yml logs [service]`

## File Structure Created

```
├── Dockerfile.backend.dev      # Backend development container
├── Dockerfile.frontend.dev     # Frontend development container  
├── docker-compose.dev.yml      # Development orchestration
├── .env.dev                  # Development environment variables
└── README.dev.md             # This file
```

## Common Commands

```bash
# Rebuild specific service
docker-compose -f docker-compose.dev.yml up --build frontend

# Access container shell
docker-compose -f docker-compose.dev.yml exec backend sh
docker-compose -f docker-compose.dev.yml exec frontend sh

# Access database
docker-compose -f docker-compose.dev.yml exec mongodb mongosh -u admin -p password123

# View real-time logs
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f frontend
```

## Production vs Development

- Use `docker-compose.yml` for production deployment
- Use `docker-compose.dev.yml` for development with hot reload
- Production builds optimized containers, development uses live code mounting