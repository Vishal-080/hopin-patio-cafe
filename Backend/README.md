# Cafe Backend

Backend API for HOPIN PATIO Cafe management system.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the development server:
```bash
npm run dev
```

4. The API will be available at `http://localhost:3001`

## API Documentation

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/profile` - Get user profile

### Menu
- `GET /api/v1/menu/categories` - Get menu categories
- `GET /api/v1/menu/items` - Get menu items
- `POST /api/v1/menu/items` - Create menu item (admin/staff)
- `PUT /api/v1/menu/items/:id` - Update menu item (admin/staff)
- `DELETE /api/v1/menu/items/:id` - Delete menu item (admin)

## Environment Variables

See `.env.example` for required environment variables.

## Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier