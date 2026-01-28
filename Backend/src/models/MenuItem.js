const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuCategory',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  cost: {
    type: Number,
    min: 0
  },
  ingredients: [String],
  allergens: [String],
  dietaryInfo: [{
    type: {
      type: String,
      enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free']
    },
    isApplicable: {
      type: Boolean,
      default: false
    }
  }],
  imageUrl: String,
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);