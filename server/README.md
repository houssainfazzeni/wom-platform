# WOM Platform Backend - Authentication System

This is the backend authentication system for the WOM Platform.

## Features

- **User Registration**: Create new user accounts with role assignment
- **User Login**: Authenticate users with email and password
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for admin, company, freelancer, and investor roles
- **Password Hashing**: Secure password storage using bcryptjs
- **Protected Routes**: Middleware to protect sensitive endpoints

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/wom-platform
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
```

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

## API Endpoints

### Authentication Routes

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "freelancer"
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "freelancer",
    "createdAt": "2026-02-22T10:30:00Z"
  }
}
```

#### Login User
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "freelancer",
    "createdAt": "2026-02-22T10:30:00Z"
  }
}
```

#### Get Current User
- **Endpoint**: `GET /api/auth/me`
- **Access**: Private (requires JWT token)
- **Headers**:
```
Authorization: Bearer <your_jwt_token>
```
- **Success Response** (200):
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "freelancer",
    "createdAt": "2026-02-22T10:30:00Z"
  }
}
```

## User Roles

- **admin**: Full system access, can manage users and content
- **company**: Can create projects and hire freelancers
- **freelancer**: Can apply for projects and complete work (default)
- **investor**: Can view projects and invest

## File Structure

```
server/
├── config/
│   └── database.js           # Database connection configuration
├── controllers/
│   └── authController.js     # Authentication logic
├── middleware/
│   ├── auth.js              # JWT verification and role authorization
│   └── roleAuth.js          # Pre-configured role middleware
├── models/
│   └── User.js              # User schema and model
├── routes/
│   ├── index.js             # Main routes file
│   └── auth.js              # Authentication routes
├── .env.example             # Environment variables template
├── server.js                # Main server file
└── README.md                # This file
```

## Middleware Usage

### Protecting Routes with JWT

```javascript
const { protect } = require('./middleware/auth');

router.get('/protected-route', protect, (req, res) => {
  // req.user contains decoded JWT data (id, role)
  res.json({ message: 'This is a protected route', user: req.user });
});
```

### Role-Based Access Control

```javascript
const { protect, authorize } = require('./middleware/auth');

// Only admins can access
router.get('/admin-only', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

// Only companies can access
router.get('/company-only', protect, authorize('company'), (req, res) => {
  res.json({ message: 'Company access granted' });
});

// Multiple roles
router.get('/multi-role', protect, authorize('admin', 'company'), (req, res) => {
  res.json({ message: 'Admin or Company access granted' });
});
```

### Using Pre-configured Role Middleware

```javascript
const { adminOnly, companyOnly, freelancerOnly } = require('./middleware/roleAuth');

router.get('/admin', adminOnly, (req, res) => {
  res.json({ message: 'Admin only' });
});

router.get('/company', companyOnly, (req, res) => {
  res.json({ message: 'Company only' });
});
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP Status Codes:
- **400**: Bad Request (missing or invalid fields)
- **401**: Unauthorized (invalid or missing token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **500**: Server Error

## Database Schema

### User Model

```javascript
{
  id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: admin, company, freelancer, investor),
  createdAt: Date (default: now),
  updatedAt: Date
}
```

## Security Features

- ✅ Passwords hashed with bcryptjs
- ✅ JWT token-based authentication
- ✅ Role-based access control
- ✅ Email validation
- ✅ Password minimum length requirement
- ✅ Unique email constraint
- ✅ Protected routes middleware

## Testing the API

### Using cURL

Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "freelancer"
  }'
```

Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Get Current User:
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token_from_login>"
```

### Using Postman

1. Import the endpoints into Postman
2. For protected routes, add header: `Authorization: Bearer <your_token>`
3. Test the responses

## Next Steps

- Add email verification
- Add password reset functionality
- Add user profile update endpoint
- Add logout/token blacklist functionality
- Add rate limiting
- Add request validation
- Add comprehensive error logging
- Add user permissions system

## License

MIT