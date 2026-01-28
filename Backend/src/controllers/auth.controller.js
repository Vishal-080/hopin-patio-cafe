const User = require('../models/User');
const { generateToken, generateRefreshToken } = require('../config/jwt.config');
const logger = require('../utils/logger');

const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'EMAIL_EXISTS',
          message: 'An account with this email already exists'
        }
      });
    }

    const user = new User({
      email: email.toLowerCase(),
      password,
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
      phone
    });

    await user.save();

    const userObject = user.toObject();
    delete userObject.password;

    const token = generateToken({
      sub: user._id,
      email: user.email,
      role: user.role,
      permissions: user.getPermissions()
    });

    const refreshToken = generateRefreshToken({ sub: user._id });

    res.status(201).json({
      success: true,
      data: {
        user: userObject,
        token,
        refreshToken
      },
      message: 'Account created successfully'
    });

  } catch (error) {
    logger.error('Registration error:', error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'ACCOUNT_INACTIVE',
          message: 'Account has been deactivated'
        }
      });
    }

    const userObject = user.toObject();
    delete userObject.password;

    const token = generateToken({
      sub: user._id,
      email: user.email,
      role: user.role,
      permissions: user.getPermissions()
    });

    const refreshToken = generateRefreshToken({ sub: user._id });

    res.json({
      success: true,
      data: {
        user: userObject,
        token,
        refreshToken
      },
      message: 'Login successful'
    });

  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'REFRESH_TOKEN_REQUIRED',
          message: 'Refresh token is required'
        }
      });
    }

    const { verifyRefreshToken } = require('../config/jwt.config');
    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.sub);
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_REFRESH_TOKEN',
          message: 'Invalid refresh token'
        }
      });
    }

    const newToken = generateToken({
      sub: user._id,
      email: user.email,
      role: user.role,
      permissions: user.getPermissions()
    });

    res.json({
      success: true,
      data: {
        token: newToken
      },
      message: 'Token refreshed successfully'
    });

  } catch (error) {
    logger.error('Token refresh error:', error);
    
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_REFRESH_TOKEN',
          message: 'Invalid or expired refresh token'
        }
      });
    }
    
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.sub)
      .select('-password')
      .populate('preferences.favoriteItems', 'name price imageUrl');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        preferences: user.preferences,
        addresses: user.addresses,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    logger.error('Get profile error:', error);
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getProfile
};