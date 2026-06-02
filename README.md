# Vehicle Booking Backend System

A production-ready RESTful backend API system for a Vehicle Booking application built with Node.js, Express, and MongoDB.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose
- **Security**: JWT, Bcryptjs, Rate Limiter

## Quick Start

### 1. Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/vehicle-booking
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

### 2. Install & Run
```bash
# Install dependencies
npm install

# Seed dataset (18,289 records)
npm run seed

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## Folder Structure
```text
src/
├── config/       # Database connection setup
├── controllers/  # Express request handlers
├── middlewares/  # Security, auth, and error handlers
├── models/       # Mongoose models (User, Booking)
├── routes/       # API endpoints mapping
├── seed/         # Data import seed script
├── utils/        # Generic helpers (pagination, sorting)
├── constants/    # Global enums and roles
└── app.js        # Express application initialization
```

## API Endpoints Catalog

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT token

### Bookings (Protected)
- `GET /api/v1/bookings` - Get all bookings (with pagination, filter, search, sort)
- `POST /api/v1/bookings` - Create a booking
- `GET /api/v1/bookings/:id` - Get a single booking
- `PUT /api/v1/bookings/:id` - Update a booking
- `DELETE /api/v1/bookings/:id` - Hard delete booking
- `PATCH /api/v1/bookings/:id/status` - Update booking status
- `PATCH /api/v1/bookings/:id/soft-delete` - Soft delete booking

### Analytics
- `GET /api/v1/analytics/booking-stats` - Booking statistics by status
- `GET /api/v1/analytics/success-rate` - Success rate percentage
- `GET /api/v1/analytics/top-vehicles` - Most booked vehicle types
- `GET /api/v1/analytics/highest-fare` - Top 10 highest-fare rides
- `GET /api/v1/analytics/monthly-rides` - Monthly ride trends

### Admin (Protected: Admin Only)
- `GET /api/v1/admin/dashboard` - Global platform counters
- `GET /api/v1/admin/users` - Fetch all users
- `GET /api/v1/admin/users/:id` - Get specific user details
- `PATCH /api/v1/admin/users/:id/role` - Update user authorization role
- `PATCH /api/v1/admin/users/:id/status` - Toggle user activity status

### Health Check
- `GET /api/v1/health` - Check server status
