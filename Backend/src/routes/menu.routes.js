const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { menuItemValidation, mongoIdValidation } = require('../middleware/validation.middleware');

router.get('/categories', menuController.getCategories);
router.get('/items', menuController.getItems);

router.post('/categories', 
  authMiddleware.authenticateToken,
  authMiddleware.authorize(['menu:create']),
  menuController.createCategory
);

router.post('/items',
  authMiddleware.authenticateToken,
  authMiddleware.authorize(['menu:create']),
  menuItemValidation,
  menuController.createItem
);

router.put('/items/:id',
  authMiddleware.authenticateToken,
  authMiddleware.authorize(['menu:update']),
  mongoIdValidation('id'),
  menuItemValidation,
  menuController.updateItem
);

router.delete('/items/:id',
  authMiddleware.authenticateToken,
  authMiddleware.authorize(['menu:delete']),
  mongoIdValidation('id'),
  menuController.deleteItem
);

module.exports = router;