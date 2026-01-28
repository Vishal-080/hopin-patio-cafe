# Cafe Backend Database Schema (MongoDB)

## User Management Collections

### users
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  firstName: String (required),
  lastName: String (required),
  phone: String,
  role: String (enum: ['customer', 'staff', 'admin'], default: 'customer'),
  isActive: Boolean (default: true),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now),
  preferences: {
    dietaryRestrictions: [String],
    favoriteItems: [ObjectId] // references menu_items
  },
  addresses: [{
    type: String (enum: ['home', 'work', 'other']),
    street: String,
    city: String,
    state: String,
    zipCode: String,
    isDefault: Boolean
  }]
}
```

## Menu Management Collections

### menu_categories
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  displayOrder: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### menu_items
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  category: ObjectId (ref: 'menu_categories', required),
  price: Number (required, min: 0),
  cost: Number (min: 0), // for inventory tracking
  ingredients: [String],
  allergens: [String],
  dietaryInfo: [{
    type: String (enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free']),
    isApplicable: Boolean
  }],
  imageUrl: String,
  isAvailable: Boolean (default: true),
  preparationTime: Number (minutes),
  displayOrder: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## Order Management Collections

### orders
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique, auto-generated),
  customer: ObjectId (ref: 'users', required),
  items: [{
    menuItem: ObjectId (ref: 'menu_items', required),
    quantity: Number (min: 1, required),
    price: Number (required), // price at time of order
    customizations: [{
      name: String,
      value: String,
      price: Number
    }],
    specialInstructions: String
  }],
  orderType: String (enum: ['dine-in', 'takeout', 'delivery'], required),
  totalAmount: Number (required),
  tax: Number,
  deliveryFee: Number,
  tip: Number,
  status: String (enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'], default: 'pending'),
  paymentStatus: String (enum: ['pending', 'paid', 'refunded'], default: 'pending'),
  paymentMethod: String (enum: ['cash', 'card', 'online']),
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  assignedStaff: ObjectId (ref: 'users'), // staff member handling order
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

## Reservation Management Collections

### reservations
```javascript
{
  _id: ObjectId,
  customer: ObjectId (ref: 'users', required),
  date: Date (required),
  time: String (required), // HH:mm format
  partySize: Number (min: 1, max: 20, required),
  tableNumber: String,
  status: String (enum: ['pending', 'confirmed', 'seated', 'completed', 'cancelled'], default: 'pending'),
  specialRequests: String,
  contactPhone: String,
  contactEmail: String,
  assignedStaff: ObjectId (ref: 'users'),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

### table_availability
```javascript
{
  _id: ObjectId,
  tableNumber: String (unique, required),
  capacity: Number (required),
  location: String, // 'indoor', 'outdoor', 'patio'
  isActive: Boolean (default: true),
  reservations: [{
    date: Date,
    timeSlots: [String] // array of time slots like '18:00', '18:30', etc.
  }]
}
```

## Staff Management Collections

### staff_profiles
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'users', unique, required),
  employeeId: String (unique, required),
  position: String (enum: ['manager', 'chef', 'waiter', 'host', 'cashier', 'delivery'], required),
  department: String (enum: ['kitchen', 'service', 'management'], required),
  hireDate: Date (required),
  salary: Number,
  workSchedule: [{
    dayOfWeek: Number, // 0-6 (Sunday-Saturday)
    startTime: String, // HH:mm
    endTime: String,    // HH:mm
    isActive: Boolean
  }],
  certifications: [{
    name: String,
    issuedDate: Date,
    expiryDate: Date,
    issuingAuthority: String
  }],
  performance: {
    rating: Number, // 1-5
    lastReviewDate: Date,
    notes: String
  },
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## Inventory Management Collections

### inventory_categories
```javascript
{
  _id: ObjectId,
  name: String (unique, required),
  description: String,
  parentId: ObjectId (ref: 'inventory_categories'), // for nested categories
  createdAt: Date
}
```

### inventory_items
```javascript
{
  _id: ObjectId,
  name: String (required),
  category: ObjectId (ref: 'inventory_categories', required),
  currentStock: Number (required, min: 0),
  unit: String (required), // 'kg', 'liters', 'pieces', etc.
  minStockLevel: Number (required), // reorder point
  maxStockLevel: Number,
  unitCost: Number (required),
  supplier: String,
  lastRestocked: Date,
  expiryDate: Date,
  batchNumber: String,
  storageLocation: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### inventory_transactions
```javascript
{
  _id: ObjectId,
  inventoryItem: ObjectId (ref: 'inventory_items', required),
  transactionType: String (enum: ['purchase', 'usage', 'waste', 'adjustment', 'return'], required),
  quantity: Number (required), // positive for incoming, negative for outgoing
  unitCost: Number,
  reference: {
    type: String (enum: ['order', 'purchase_order', 'manual', 'waste_report']),
    id: ObjectId // reference to order, purchase order, etc.
  },
  reason: String,
  performedBy: ObjectId (ref: 'users', required),
  timestamp: Date (default: Date.now),
  notes: String
}
```

## Configuration Collections

### cafe_settings
```javascript
{
  _id: ObjectId,
  key: String (unique, required),
  value: Schema.Types.Mixed,
  description: String,
  category: String, // 'general', 'pricing', 'hours', etc.
  lastUpdatedBy: ObjectId (ref: 'users'),
  updatedAt: Date (default: Date.now)
}
```

## Analytics Collections

### daily_reports
```javascript
{
  _id: ObjectId,
  date: Date (unique, required),
  totalOrders: Number,
  totalRevenue: Number,
  totalReservations: Number,
  peakHours: [{
    hour: Number,
    orderCount: Number
  }],
  topMenuItems: [{
    menuItem: ObjectId (ref: 'menu_items'),
    quantitySold: Number,
    revenue: Number
  }],
  staffPerformance: [{
    staff: ObjectId (ref: 'users'),
    ordersHandled: Number,
    averageOrderValue: Number
  }],
  createdAt: Date
}
```