# Cafe Backend REST API Design

## Base URL
`/api/v1`

## Authentication Endpoints

### POST /auth/register
**Description**: Register a new user account
**Request Body**:
```javascript
{
  email: String (required),
  password: String (min: 8, required),
  firstName: String (required),
  lastName: String (required),
  phone: String (optional)
}
```
**Response**:
```javascript
{
  success: true,
  data: {
    user: {
      id: String,
      email: String,
      firstName: String,
      lastName: String,
      role: String
    },
    token: String
  }
}
```

### POST /auth/login
**Description**: Authenticate user and return JWT token
**Request Body**:
```javascript
{
  email: String (required),
  password: String (required)
}
```
**Response**:
```javascript
{
  success: true,
  data: {
    user: {
      id: String,
      email: String,
      firstName: String,
      lastName: String,
      role: String
    },
    token: String
  }
}
```

### POST /auth/logout
**Description**: Logout user (invalidate token)
**Headers**: `Authorization: Bearer <token>`
**Response**:
```javascript
{
  success: true,
  message: "Logged out successfully"
}
```

### GET /auth/profile
**Description**: Get current user profile
**Headers**: `Authorization: Bearer <token>`
**Response**:
```javascript
{
  success: true,
  data: {
    id: String,
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    role: String,
    preferences: Object,
    addresses: Array
  }
}
```

## Menu Management Endpoints

### GET /menu/categories
**Description**: Get all menu categories
**Response**:
```javascript
{
  success: true,
  data: [{
    id: String,
    name: String,
    description: String,
    displayOrder: Number
  }]
}
```

### GET /menu/items
**Description**: Get all menu items (optionally filtered by category)
**Query Parameters**:
- `category` (optional): Category ID to filter by
- `available` (optional): Boolean to filter availability
**Response**:
```javascript
{
  success: true,
  data: [{
    id: String,
    name: String,
    description: String,
    category: {
      id: String,
      name: String
    },
    price: Number,
    imageUrl: String,
    isAvailable: Boolean,
    preparationTime: Number,
    dietaryInfo: Array,
    allergens: Array
  }]
}
```

### POST /menu/items (Admin/Staff only)
**Description**: Create new menu item
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```javascript
{
  name: String (required),
  description: String,
  category: String (required),
  price: Number (required),
  ingredients: Array,
  allergens: Array,
  dietaryInfo: Array,
  imageUrl: String,
  preparationTime: Number
}
```

### PUT /menu/items/:id (Admin/Staff only)
**Description**: Update menu item
**Headers**: `Authorization: Bearer <token>`
**Request Body**: Same as POST (partial update allowed)

### DELETE /menu/items/:id (Admin only)
**Description**: Delete menu item
**Headers**: `Authorization: Bearer <token>`

## Order Management Endpoints

### GET /orders
**Description**: Get user's orders (or all orders for staff)
**Headers**: `Authorization: Bearer <token>`
**Query Parameters**:
- `status` (optional): Filter by order status
- `dateFrom` (optional): Filter by date range
- `dateTo` (optional): Filter by date range
**Response**:
```javascript
{
  success: true,
  data: [{
    id: String,
    orderNumber: String,
    items: Array,
    totalAmount: Number,
    status: String,
    orderType: String,
    createdAt: Date,
    estimatedDeliveryTime: Date
  }]
}
```

### POST /orders
**Description**: Create new order
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```javascript
{
  items: [{
    menuItem: String (required),
    quantity: Number (required),
    customizations: Array,
    specialInstructions: String
  }],
  orderType: String (required), // 'dine-in', 'takeout', 'delivery'
  deliveryAddress: Object, // required for delivery orders
  tip: Number
}
```
**Response**:
```javascript
{
  success: true,
  data: {
    id: String,
    orderNumber: String,
    totalAmount: Number,
    estimatedDeliveryTime: Date,
    status: String
  }
}
```

### GET /orders/:id
**Description**: Get specific order details
**Headers**: `Authorization: Bearer <token>`

### PUT /orders/:id/status (Staff only)
**Description**: Update order status
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```javascript
{
  status: String (required), // 'confirmed', 'preparing', 'ready', 'completed'
  notes: String
}
```

## Reservation Management Endpoints

### GET /reservations
**Description**: Get user's reservations
**Headers**: `Authorization: Bearer <token>`
**Query Parameters**:
- `date` (optional): Filter by date
- `status` (optional): Filter by status

### POST /reservations
**Description**: Create new reservation
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```javascript
{
  date: String (required, YYYY-MM-DD),
  time: String (required, HH:mm),
  partySize: Number (required),
  specialRequests: String,
  contactPhone: String
}
```
**Response**:
```javascript
{
  success: true,
  data: {
    id: String,
    date: Date,
    time: String,
    partySize: Number,
    status: String,
    tableNumber: String
  }
}
```

### GET /reservations/availability
**Description**: Check table availability for specific date/time
**Query Parameters**:
- `date` (required): YYYY-MM-DD
- `partySize` (required): Number
- `timeSlot` (optional): HH:mm
**Response**:
```javascript
{
  success: true,
  data: {
    availableSlots: [{
      time: String,
      availableTables: Number
    }],
    unavailableTimes: Array
  }
}
```

### PUT /reservations/:id/status (Staff only)
**Description**: Update reservation status
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```javascript
{
  status: String (required), // 'confirmed', 'seated', 'completed', 'cancelled'
  tableNumber: String
}
```

## Inventory Management Endpoints (Staff/Admin only)

### GET /inventory/items
**Headers**: `Authorization: Bearer <token>`
**Query Parameters**:
- `category` (optional): Filter by category
- `lowStock` (optional): Boolean to show low stock items
**Response**:
```javascript
{
  success: true,
  data: [{
    id: String,
    name: String,
    category: String,
    currentStock: Number,
    unit: String,
    minStockLevel: Number,
    unitCost: Number,
    lastRestocked: Date
  }]
}
```

### POST /inventory/items
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```javascript
{
  name: String (required),
  category: String (required),
  currentStock: Number (required),
  unit: String (required),
  minStockLevel: Number (required),
  unitCost: Number (required),
  supplier: String
}
```

### PUT /inventory/items/:id
**Headers**: `Authorization: Bearer <token>`
**Request Body**: Partial update allowed

### POST /inventory/transactions
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```javascript
{
  inventoryItem: String (required),
  transactionType: String (required),
  quantity: Number (required),
  reason: String,
  reference: {
    type: String,
    id: String
  }
}
```

## Staff Management Endpoints (Admin only)

### GET /staff
**Headers**: `Authorization: Bearer <token>`
**Response**:
```javascript
{
  success: true,
  data: [{
    id: String,
    user: {
      id: String,
      email: String,
      firstName: String,
      lastName: String
    },
    employeeId: String,
    position: String,
    department: String,
    isActive: Boolean
  }]
}
```

### POST /staff
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```javascript
{
  user: String (required), // existing user ID
  employeeId: String (required),
  position: String (required),
  department: String (required),
  hireDate: String (required),
  workSchedule: Array
}
```

## Analytics Endpoints (Staff/Admin only)

### GET /analytics/daily
**Headers**: `Authorization: Bearer <token>`
**Query Parameters**:
- `date` (optional): Specific date (defaults to today)
**Response**:
```javascript
{
  success: true,
  data: {
    date: Date,
    totalOrders: Number,
    totalRevenue: Number,
    totalReservations: Number,
    peakHours: Array,
    topMenuItems: Array
  }
}
```

### GET /analytics/revenue
**Headers**: `Authorization: Bearer <token>`
**Query Parameters**:
- `period` (optional): 'week', 'month', 'quarter', 'year'
- `startDate` (optional): Custom date range
- `endDate` (optional): Custom date range

## Error Response Format
```javascript
{
  success: false,
  error: {
    code: String, // e.g., 'VALIDATION_ERROR', 'NOT_FOUND', 'UNAUTHORIZED'
    message: String,
    details: Array // for validation errors
  }
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error