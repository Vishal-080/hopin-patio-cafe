# Environment Variables and Configuration

## .env.example Template

```bash
# Node Environment
NODE_ENV=development
PORT=3001

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/cafe-backend
MONGODB_TEST_URI=mongodb://localhost:27017/cafe-backend-test

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_SECRET=your-refresh-token-secret-key
REFRESH_TOKEN_EXPIRES_IN=7d

# Email Configuration (for order confirmations, password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-cafe-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@yourcafe.com
FROM_NAME=Your Cafe Name

# Payment Gateway Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,webp

# Redis Configuration (for caching and sessions)
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your-redis-password

# CORS Configuration
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3001

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_MAX=5

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# External Services
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# Analytics
GOOGLE_ANALYTICS_ID=GA-MEASUREMENT-ID
FACEBOOK_PIXEL_ID=your-facebook-pixel-id

# Development Specific
DEBUG=cafe-backend:*
```

## Configuration Files

### Database Configuration (`src/config/database.config.js`)
```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
```

### JWT Configuration (`src/config/jwt.config.js`)
```javascript
import jwt from 'jsonwebtoken';

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  issuer: 'cafe-backend',
  audience: 'cafe-frontend'
};

export const refreshTokenConfig = {
  secret: process.env.REFRESH_TOKEN_SECRET,
  expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
};

export const generateToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, jwtConfig.secret, {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience
  });
};
```

### Email Configuration (`src/config/email.config.js`)
```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const emailConfig = {
  transporter,
  from: {
    name: process.env.FROM_NAME || 'Your Cafe',
    email: process.env.FROM_EMAIL
  }
};

// Email templates
export const emailTemplates = {
  welcome: {
    subject: 'Welcome to Your Cafe!',
    template: 'welcome'
  },
  orderConfirmation: {
    subject: 'Order Confirmation',
    template: 'order-confirmation'
  },
  reservationConfirmation: {
    subject: 'Reservation Confirmed',
    template: 'reservation-confirmation'
  },
  passwordReset: {
    subject: 'Password Reset Request',
    template: 'password-reset'
  }
};
```

### CORS Configuration (`src/config/cors.config.js`)
```javascript
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:'];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

export default corsOptions;
```

### File Upload Configuration (`src/config/upload.config.js`)
```javascript
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = process.env.UPLOAD_PATH || './uploads';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || ['jpg', 'jpeg', 'png', 'gif'];
  const fileExtension = path.extname(file.originalname).toLowerCase().slice(1);
  
  if (allowedTypes.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

export const uploadConfig = {
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  }
};
```

### Rate Limiting Configuration (`src/config/rate-limit.config.js`)
```javascript
import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 5,
  message: {
    success: false,
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts, please try again later'
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});
```

### Logging Configuration (`src/config/logging.config.js`)
```javascript
import winston from 'winston';
import path from 'path';

const logLevel = process.env.LOG_LEVEL || 'info';
const logFile = process.env.LOG_FILE || './logs/app.log';

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'cafe-backend' },
  transports: [
    new winston.transports.File({ 
      filename: path.join(path.dirname(logFile), 'error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: logFile 
    })
  ]
});

// Add console transport for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;
```

## Environment-Specific Configurations

### Development Environment
```bash
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/cafe-backend-dev
LOG_LEVEL=debug
FRONTEND_URL=http://localhost:5173
```

### Production Environment
```bash
NODE_ENV=production
PORT=
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cafe-prod
LOG_LEVEL=info
FRONTEND_URL=https://your-cafe.com
```

### Test Environment
```bash
NODE_ENV=test
PORT=3002
MONGODB_TEST_URI=mongodb://localhost:27017/cafe-backend-test
LOG_LEVEL=error
```

## Validation and Security

### Environment Variable Validation (`src/config/env.validation.js`)
```javascript
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'FRONTEND_URL'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

// Validate JWT secret length
if (process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long');
}

// Validate MongoDB URI format
if (!process.env.MONGODB_URI.startsWith('mongodb://') && !process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
  throw new Error('MONGODB_URI must be a valid MongoDB connection string');
}

console.log('Environment variables validated successfully');
```

## Best Practices

### 1. Security
- **Never commit `.env` file** to version control
- **Use strong secrets** for JWT and database passwords
- **Rotate secrets regularly** in production
- **Use environment-specific configs** for different deployments

### 2. Development Workflow
- **Use `.env.example`** as a template for new developers
- **Document all environment variables** with descriptions
- **Validate required variables** at application startup
- **Provide sensible defaults** where possible

### 3. Production Deployment
- **Use secret management services** (AWS Secrets Manager, etc.)
- **Set appropriate file permissions** for sensitive files
- **Monitor for leaked credentials** using security scanning tools
- **Implement environment variable encryption** for sensitive data

### 4. Testing
- **Use separate test database** configuration
- **Mock external services** in test environment
- **Override env vars in CI/CD pipeline** as needed
- **Clean up test data** after test runs

This configuration setup ensures your cafe backend is secure, scalable, and maintainable across different environments.