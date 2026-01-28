const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Order routes not implemented yet'
    }
  });
});

module.exports = router;