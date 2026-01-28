const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { registerValidation, loginValidation } = require('../middleware/validation.middleware');
const authLimiter = require('../middleware/rate-limit.middleware');

router.post('/register', authLimiter, registerValidation, authController.register);
router.post('/login', authLimiter, loginValidation, authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/profile', authMiddleware.authenticateToken, authController.getProfile);

module.exports = router;