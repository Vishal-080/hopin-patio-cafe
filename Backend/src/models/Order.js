const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    customizations: [{
      name: String,
      value: String,
      price: Number
    }],
    specialInstructions: String
  }],
  orderType: {
    type: String,
    enum: ['dine-in', 'takeout', 'delivery'],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  tax: {
    type: Number
  },
  deliveryFee: {
    type: Number
  },
  tip: {
    type: Number
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online']
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  assignedStaff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const lastOrder = await this.constructor.findOne().sort({ createdAt: -1 });
    const lastNumber = lastOrder ? parseInt(lastOrder.orderNumber.slice(-6)) : 0;
    this.orderNumber = `ORD${String(lastNumber + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);