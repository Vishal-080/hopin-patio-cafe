const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');

const getCategories = async (req, res, next) => {
  try {
    const categories = await MenuCategory.find({ isActive: true })
      .sort({ displayOrder: 1, name: 1 });

    res.json({
      success: true,
      data: categories.map(category => ({
        id: category._id,
        name: category.name,
        description: category.description,
        displayOrder: category.displayOrder
      }))
    });

  } catch (error) {
    next(error);
  }
};

const getItems = async (req, res, next) => {
  try {
    const { category, available } = req.query;
    
    let filter = { isActive: true };
    
    if (category) {
      filter.category = category;
    }
    
    if (available !== undefined) {
      filter.isAvailable = available === 'true';
    }

    const items = await MenuItem.find(filter)
      .populate('category', 'name')
      .sort({ displayOrder: 1, name: 1 });

    res.json({
      success: true,
      data: items.map(item => ({
        id: item._id,
        name: item.name,
        description: item.description,
        category: {
          id: item.category._id,
          name: item.category.name
        },
        price: item.price,
        imageUrl: item.imageUrl,
        isAvailable: item.isAvailable,
        preparationTime: item.preparationTime,
        dietaryInfo: item.dietaryInfo?.filter(diet => diet.isApplicable) || [],
        allergens: item.allergens || []
      }))
    });

  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, description, displayOrder } = req.body;

    const category = new MenuCategory({
      name,
      description,
      displayOrder: displayOrder || 0
    });

    await category.save();

    res.status(201).json({
      success: true,
      data: {
        id: category._id,
        name: category.name,
        description: category.description,
        displayOrder: category.displayOrder
      },
      message: 'Menu category created successfully'
    });

  } catch (error) {
    next(error);
  }
};

const createItem = async (req, res, next) => {
  try {
    const itemData = req.body;

    const item = new MenuItem(itemData);
    await item.save();
    await item.populate('category', 'name');

    res.status(201).json({
      success: true,
      data: {
        id: item._id,
        name: item.name,
        description: item.description,
        category: {
          id: item.category._id,
          name: item.category.name
        },
        price: item.price,
        imageUrl: item.imageUrl,
        isAvailable: item.isAvailable,
        preparationTime: item.preparationTime,
        dietaryInfo: item.dietaryInfo?.filter(diet => diet.isApplicable) || [],
        allergens: item.allergens
      },
      message: 'Menu item created successfully'
    });

  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const item = await MenuItem.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!item) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Menu item not found'
        }
      });
    }

    res.json({
      success: true,
      data: {
        id: item._id,
        name: item.name,
        description: item.description,
        category: {
          id: item.category._id,
          name: item.category.name
        },
        price: item.price,
        imageUrl: item.imageUrl,
        isAvailable: item.isAvailable,
        preparationTime: item.preparationTime,
        dietaryInfo: item.dietaryInfo?.filter(diet => diet.isApplicable) || [],
        allergens: item.allergens
      },
      message: 'Menu item updated successfully'
    });

  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await MenuItem.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Menu item not found'
        }
      });
    }

    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getItems,
  createCategory,
  createItem,
  updateItem,
  deleteItem
};