const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['customer', 'staff', 'admin'],
    default: 'customer'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  preferences: {
    dietaryRestrictions: [String],
    favoriteItems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem'
    }]
  },
  addresses: [{
    type: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'home'
    },
    street: String,
    city: String,
    state: String,
    zipCode: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getPermissions = function() {
  const permissions = {
    customer: [
      'auth:login',
      'users:create',
      'users:read:own',
      'users:update:own',
      'menu:read',
      'orders:create',
      'orders:read:own',
      'orders:delete:own',
      'reservations:create',
      'reservations:read:own'
    ],
    staff: [
      'auth:login',
      'users:create',
      'users:read:own',
      'users:update:own',
      'menu:read',
      'orders:create',
      'orders:read:own',
      'orders:read:any',
      'orders:update:status',
      'orders:delete:own',
      'reservations:create',
      'reservations:read:own',
      'reservations:read:any',
      'reservations:update:status',
      'inventory:read',
      'inventory:update',
      'inventory:create',
      'staff:read',
      'analytics:read'
    ],
    admin: [
      'auth:login',
      'users:create',
      'users:read:own',
      'users:read:any',
      'users:update:own',
      'users:update:any',
      'menu:read',
      'menu:create',
      'menu:update',
      'menu:delete',
      'orders:create',
      'orders:read:own',
      'orders:read:any',
      'orders:update:status',
      'orders:delete:own',
      'reservations:create',
      'reservations:read:own',
      'reservations:read:any',
      'reservations:update:status',
      'inventory:read',
      'inventory:update',
      'inventory:create',
      'staff:read',
      'staff:create',
      'staff:update',
      'analytics:read'
    ]
  };
  
  return permissions[this.role] || [];
};

module.exports = mongoose.model('User', userSchema);