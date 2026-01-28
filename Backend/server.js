require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const connectDB = require('./src/config/database.config');
const logger = require('./src/utils/logger');
const errorHandler = require('./src/middleware/error.middleware');

const authRoutes = require('./src/routes/auth.routes');
const menuRoutes = require('./src/routes/menu.routes');
const orderRoutes = require('./src/routes/order.routes');
const reservationRoutes = require('./src/routes/reservation.routes');
const userRoutes = require('./src/routes/user.routes');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.set('io', io);

connectDB();

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true
}));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    }
  }
});

app.use('/api/', generalLimiter);

app.use('/uploads', express.static('uploads'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Cafe Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'API endpoint not found'
    }
  });
});

app.use(errorHandler);

io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('join-order-room', (orderId) => {
    socket.join(`order-${orderId}`);
    logger.info(`Client ${socket.id} joined order room: ${orderId}`);
  });

  socket.on('join-inventory-room', () => {
    socket.join('inventory-updates');
    logger.info(`Client ${socket.id} joined inventory room`);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  logger.info(`Health check available at: http://localhost:${PORT}/health`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

module.exports = app;