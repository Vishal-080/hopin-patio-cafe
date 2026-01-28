const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const menuRoutes = require('./menu.routes');

router.use('/auth', authRoutes);
router.use('/menu', menuRoutes);

module.exports = router;