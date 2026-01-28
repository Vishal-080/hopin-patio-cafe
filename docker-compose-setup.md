# Cafe Management System - Docker Setup

This Docker Compose setup provides a complete development and production environment for the cafe management system.

## Services

### 🗄️ **MongoDB**
- **Container**: `cafe-mongodb`
- **Port**: `27017`
- **Database**: `cafe-backend`
- **Credentials**: admin/password123
- **Data**: Persisted in Docker volume

### 🔴 **Redis**
- **Container**: `cafe-redis`
- **Port**: `6379`
- **Purpose**: Caching and session storage
- **Data**: Persisted in Docker volume

### 🔧 **Backend API**
- **Container**: `cafe-backend`
- **Port**: `3001`
- **Environment**: Production mode
- **Health Check**: `/health` endpoint
- **Volumes**: Logs and uploads persisted

### 🎨 **Frontend**
- **Container**: `cafe-frontend`
- **Port**: `5173`
- **Build**: Multi-stage Docker build
- **Environment**: API URL configuration

### 🌐 **Nginx Reverse Proxy** (Production Only)
- **Container**: `cafe-nginx`
- **Ports**: `80`, `443`
- **SSL**: Ready for SSL certificates
- **Proxy**: Frontend + API routing

## Quick Start

### Development Mode
```bash
# Start core services (MongoDB + Redis + Backend + Frontend)
docker-compose up

# Or start in detached mode
docker-compose up -d
```

### Production Mode (with Nginx)
```bash
# Start all services including Nginx reverse proxy
docker-compose --profile production up

# Production with detached mode
docker-compose --profile production up -d
```

### Stop Services
```bash
# Stop all running services
docker-compose down

# Remove volumes (delete all data)
docker-compose down -v
```

## Access Points

| Service | URL | Description |
|----------|------|-------------|
| Frontend | http://localhost:5173 | React application |
| Backend API | http://localhost:3001 | REST API |
| Backend Health | http://localhost:3001/health | Health check |
| MongoDB | mongodb://localhost:27017 | Database connection |
| Redis | redis://localhost:6379 | Cache connection |
| Nginx (Prod) | http://localhost:80 | Reverse proxy |

## Environment Variables

### Backend Variables
- `NODE_ENV`: Application environment
- `MONGODB_URI`: MongoDB connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: JWT signing secret
- `FRONTEND_URL`: Allowed CORS origins
- `LOG_LEVEL`: Logging verbosity

### Frontend Variables
- `VITE_API_URL`: Backend API URL
- `VITE_GOOGLE_MAPS_API_KEY`: Maps API key
- `VITE_GOOGLE_ANALYTICS_ID`: Analytics tracking

## Database Initialization

The MongoDB container automatically initializes with:

1. **Admin User**: `admin@cafe.com` / `password123`
2. **Menu Categories**: Appetizers, Main Courses, Desserts, Beverages
3. **Sample Menu Items**: 5 sample items across categories

## Development Workflow

### Making Changes
1. **Backend**: Edit files in `cafe-backend/`
2. **Frontend**: Edit files in `Frontend/`
3. **Rebuild**: `docker-compose up --build`

### Viewing Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Follow logs in real-time
docker-compose logs -f backend
```

### Accessing Containers
```bash
# Access backend container
docker-compose exec backend sh

# Access database
docker-compose exec mongodb mongosh -u admin -p password123 cafe-backend

# Access Redis
docker-compose exec redis redis-cli
```

## Production Deployment

### SSL Configuration
1. Place SSL certificates in `nginx/ssl/`
2. Update nginx configuration for HTTPS
3. Use `--profile production` flag

### Environment Setup
1. Update environment variables with production values
2. Use strong passwords and secrets
3. Configure proper domains and SSL

### Monitoring
- **Health Checks**: All services have health checks
- **Logs**: Centralized logging with Winston
- **Metrics**: Application metrics available via health endpoint

## Troubleshooting

### Common Issues

**Port Conflicts**:
- Ensure ports 27017, 6379, 3001, 5173 are available
- Modify ports in docker-compose.yml if needed

**Database Connection**:
- Check MongoDB container is running: `docker-compose ps mongodb`
- Verify connection string in backend logs

**Build Failures**:
- Clear Docker cache: `docker system prune -a`
- Rebuild with `--no-cache`: `docker-compose build --no-cache`

### Useful Commands
```bash
# Check container status
docker-compose ps

# Restart services
docker-compose restart backend

# View resource usage
docker stats

# Execute commands in container
docker-compose exec backend npm run seed
```

## Volumes

### Persistent Data
- `mongodb_data`: Database data
- `redis_data`: Redis cache data
- `uploads`: Backend file uploads
- `logs`: Application logs

### Backup
```bash
# Backup database
docker-compose exec mongodb mongodump --archive --gzip > backup.gz

# Restore database
docker-compose exec -T mongodb mongorestore --archive --gzip < backup.gz
```

## Security Notes

- Default passwords are for development only
- Change all secrets in production
- Use environment-specific docker-compose files
- Enable SSL for production
- Regular security updates for base images

This setup provides a complete, scalable, and production-ready environment for the cafe management system.