const jwt = require('jsonwebtoken');
const { verifyToken, verifyRefreshToken, generateToken, generateRefreshToken } = require('../config/jwt.config');
const User = require('../models/User');
const logger = require('../utils/logger');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { 
        code: 'UNAUTHORIZED', 
        message: 'Access token required' 
      }
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({
        success: false,
        error: { 
          code: 'TOKEN_EXPIRED', 
          message: 'Access token expired' 
        }
      });
    }
    
    return res.status(403).json({
      success: false,
      error: { 
        code: 'INVALID_TOKEN', 
        message: 'Invalid access token' 
      }
    });
  }
};

const authorize = (permissions) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.sub).select('-password');
      
      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          error: { 
            code: 'USER_NOT_FOUND', 
            message: 'User not found or inactive' 
          }
        });
      }

      const userPermissions = user.getPermissions();
      
      const hasPermission = permissions.some(permission => 
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          error: { 
            code: 'FORBIDDEN', 
            message: 'Insufficient permissions' 
          }
        });
      }

      req.user = {
        ...req.user,
        role: user.role,
        permissions: userPermissions
      };

      next();
    } catch (error) {
      logger.error('Authorization error:', error);
      return res.status(500).json({
        success: false,
        error: { 
          code: 'AUTH_ERROR', 
          message: 'Authorization error' 
        }
      });
    }
  };
};

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
  } catch (error) {
    req.user = null;
  }
  
  next();
};

module.exports = {
  authenticateToken,
  authorize,
  optionalAuth
};