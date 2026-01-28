# Authentication & Authorization System Design

## User Roles and Permissions

### Role Hierarchy
1. **Customer** (lowest privilege)
2. **Staff** (mid-level privilege)
3. **Admin** (highest privilege)

### Role-Based Access Control (RBAC)

#### Customer Role
**Can**:
- Register/login to their account
- View menu and pricing
- Place orders
- Make reservations
- View their own order history
- View their own reservations
- Update their profile information
- Manage their saved addresses

**Cannot**:
- Access staff/admin endpoints
- View other customers' data
- Manage menu items
- Access inventory system
- Manage staff accounts
- View analytics

#### Staff Role
**Inherits all Customer permissions plus**:
- View all orders (not just their own)
- Update order status
- View all reservations
- Update reservation status
- View inventory items
- Create inventory transactions
- View basic analytics
- Manage table availability

**Cannot**:
- Delete menu items
- Manage staff accounts
- Access user management
- Modify system settings
- Delete critical data

#### Admin Role
**Inherits all Staff permissions plus**:
- Full CRUD operations on menu items
- User management (create/update/deactivate accounts)
- Staff management (create/update/delete staff profiles)
- Inventory management (full control)
- System configuration
- Full analytics access
- Database maintenance operations

## JWT Token Structure

### Token Payload
```javascript
{
  "sub": "user_id",           // Subject (user ID)
  "email": "user@example.com",
  "role": "customer",         // User role
  "permissions": [           // Array of permissions for easier checking
    "orders:create",
    "orders:read:own",
    "reservations:create",
    "reservations:read:own"
  ],
  "iat": 1640995200,          // Issued at
  "exp": 1641081600,          // Expires at (24 hours)
  "iss": "cafe-backend",      // Issuer
  "aud": "cafe-frontend"      // Audience
}
```

### Permission Matrix

| Permission | Customer | Staff | Admin |
|------------|----------|-------|-------|
| auth:login | ✓ | ✓ | ✓ |
| users:create | ✓ | ✗ | ✓ |
| users:read:own | ✓ | ✓ | ✓ |
| users:read:any | ✗ | ✗ | ✓ |
| users:update:own | ✓ | ✓ | ✓ |
| users:update:any | ✗ | ✗ | ✓ |
| menu:read | ✓ | ✓ | ✓ |
| menu:create | ✗ | ✗ | ✓ |
| menu:update | ✗ | ✗ | ✓ |
| menu:delete | ✗ | ✗ | ✓ |
| orders:create | ✓ | ✓ | ✓ |
| orders:read:own | ✓ | ✓ | ✓ |
| orders:read:any | ✗ | ✓ | ✓ |
| orders:update:status | ✗ | ✓ | ✓ |
| orders:delete:own | ✓ | ✓ | ✓ |
| reservations:create | ✓ | ✓ | ✓ |
| reservations:read:own | ✓ | ✓ | ✓ |
| reservations:read:any | ✗ | ✓ | ✓ |
| reservations:update:status | ✗ | ✓ | ✓ |
| inventory:read | ✗ | ✓ | ✓ |
| inventory:update | ✗ | ✓ | ✓ |
| inventory:create | ✗ | ✓ | ✓ |
| staff:read | ✗ | ✓ | ✓ |
| staff:create | ✗ | ✗ | ✓ |
| staff:update | ✗ | ✗ | ✓ |
| analytics:read | ✗ | ✓ | ✓ |

## Authentication Flow

### Registration Process
1. **Client**: POST `/auth/register` with user details
2. **Server**: 
   - Validate input data
   - Check if email already exists
   - Hash password (bcrypt, salt rounds: 12)
   - Create user document with `role: 'customer'`
   - Generate JWT token
3. **Response**: Return user data and token
4. **Client**: Store token securely (httpOnly cookie or localStorage)

### Login Process
1. **Client**: POST `/auth/login` with email/password
2. **Server**:
   - Find user by email
   - Compare password hash (bcrypt)
   - Generate JWT token with appropriate permissions
3. **Response**: Return user data and token
4. **Client**: Store token

### Token Refresh Strategy
- **Access Token**: 24 hour expiration
- **Refresh Token**: 7 day expiration (stored in httpOnly cookie)
- **Automatic Refresh**: When access token expires, use refresh token to get new access token

## Middleware Implementation

### Authentication Middleware (`auth.middleware.js`)
```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Access token required' }
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Invalid or expired token' }
      });
    }
    req.user = user;
    next();
  });
};
```

### Authorization Middleware (`authorization.middleware.js`)
```javascript
const authorize = (permissions) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions || [];
    const hasPermission = permissions.some(permission => 
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Insufficient permissions' }
      });
    }

    next();
  };
};

// Usage examples:
// router.get('/orders', authenticateToken, authorize(['orders:read:any']), getAllOrders);
// router.post('/menu', authenticateToken, authorize(['menu:create']), createMenuItem);
```

### Role-based Route Protection
```javascript
// Express route examples
const router = express.Router();

// Public routes
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.get('/menu/items', menuController.getItems);

// Customer routes
router.get('/orders', 
  authenticateToken, 
  authorize(['orders:read:own']), 
  orderController.getUserOrders
);

// Staff routes
router.put('/orders/:id/status',
  authenticateToken,
  authorize(['orders:update:status']),
  orderController.updateOrderStatus
);

// Admin routes
router.delete('/menu/items/:id',
  authenticateToken,
  authorize(['menu:delete']),
  menuController.deleteMenuItem
);
```

## Security Measures

### Password Security
- **Hashing**: bcrypt with salt rounds = 12
- **Password Requirements**: Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
- **Password Reset**: Email-based reset with expiring tokens (1 hour)

### Token Security
- **JWT Secret**: Strong random secret (256 bits minimum)
- **Token Expiration**: Short-lived access tokens (24 hours)
- **HTTPS Only**: Production tokens only transmitted over HTTPS
- **SameSite Cookies**: httpOnly cookies with SameSite=Strict

### Rate Limiting
```javascript
// Express rate limiting example
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later'
});

router.post('/auth/login', authLimiter, authController.login);
router.post('/auth/register', authLimiter, authController.register);
```

### Input Validation
- **Email Validation**: Proper email format verification
- **Password Strength**: Client and server-side validation
- **SQL Injection Prevention**: Using Mongoose with proper sanitization
- **XSS Protection**: Input sanitization and output encoding

## Session Management

### Logout Process
1. **Client**: POST `/auth/logout` with token
2. **Server**: 
   - Add token to blacklist/revocation list (Redis)
   - Clear refresh token cookie
3. **Response**: Success confirmation

### Token Blacklisting
- Store invalid/expired tokens in Redis with TTL matching token expiration
- Check blacklist on every authentication request
- Automatic cleanup of expired tokens

### Multi-Device Support
- Each device gets its own refresh token
- Users can view active sessions and revoke individual devices
- Maximum of 5 active sessions per user

## Error Handling

### Authentication Errors
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Valid token but insufficient permissions
- `409 Conflict`: Email already exists during registration
- `429 Too Many Requests`: Rate limiting triggered

### Standardized Error Responses
```javascript
{
  success: false,
  error: {
    code: 'CREDENTIALS_INVALID',
    message: 'Invalid email or password',
    details: []
  }
}
```