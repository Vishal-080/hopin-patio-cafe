const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        details: errors.array()
      }
    });
  }
  
  next();
};

const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name must be less than 50 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name must be less than 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  handleValidationErrors
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

const menuItemValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Menu item name is required')
    .isLength({ max: 100 })
    .withMessage('Menu item name must be less than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  body('category')
    .isMongoId()
    .withMessage('Valid category ID is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('preparationTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Preparation time must be a positive integer'),
  handleValidationErrors
];

const orderValidation = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.menuItem')
    .isMongoId()
    .withMessage('Valid menu item ID is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('orderType')
    .isIn(['dine-in', 'takeout', 'delivery'])
    .withMessage('Order type must be dine-in, takeout, or delivery'),
  body('deliveryAddress')
    .if((value, { req }) => req.body.orderType === 'delivery')
    .isObject()
    .withMessage('Delivery address is required for delivery orders'),
  body('tip')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Tip must be a positive number'),
  handleValidationErrors
];

const reservationValidation = [
  body('date')
    .isISO8601()
    .withMessage('Please provide a valid date'),
  body('time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid time in HH:MM format'),
  body('partySize')
    .isInt({ min: 1, max: 20 })
    .withMessage('Party size must be between 1 and 20'),
  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requests must be less than 500 characters'),
  handleValidationErrors
];

const mongoIdValidation = (paramName) => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName} ID format`),
  handleValidationErrors
];

module.exports = {
  registerValidation,
  loginValidation,
  menuItemValidation,
  orderValidation,
  reservationValidation,
  mongoIdValidation,
  handleValidationErrors
};