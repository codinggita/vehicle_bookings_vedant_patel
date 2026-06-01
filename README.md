# Vehicle Booking Backend System 🚀

A production-grade, highly scalable, and secure RESTful backend API system for a Vehicle Booking application built with Node.js, Express, and MongoDB.

## 📌 Features Overview

- **Modular Backend Architecture**: Standard-compliant controller-route concern separation.
- **Dynamic Query Builders**: Advanced search (regex protected), enums filtering, sorting validation, and soft-delete protections.
- **JWT & RBAC Security Layer**: Bearer JWT token authentication coupled with rigid Role-Based Access Control guards.
- **High-Performance Aggregations**: Centralized database calculations using MongoDB Aggregation pipelines.
- **Enterprise Middleware**: Throttling rate limiters, security CORS mappings, Morgan observabilities, and global async wrappers/error formatters.
- **Database Optimizations**: High-speed B-Tree indexes and read-only query memory `.lean()` execution plans.

---

## 🛠️ Technology Stack

- **Core Engine**: Node.js, Express.js (v5)
- **Database**: MongoDB & Mongoose
- **Security**: jsonwebtoken, bcryptjs, express-rate-limit, cors
- **Telemetry**: morgan, dotenv

---

## ⚙️ Environment Variables Configuration

Create a `.env` file in the `backend/` directory using the template below:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/vehicle_bookings
JWT_SECRET=supersecretcryptographickey
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

---

## 📦 Installation & Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd Vehicle_Bookings/backend
   ```
2. **Install all dependencies**:
   ```bash
   npm install
   ```
3. **Seed Database (Optional)**:
   ```bash
   npm run seed
   ```
4. **Launch Development Server**:
   ```bash
   npm run dev
   ```
5. **Launch Production Stack**:
   ```bash
   npm start
   ```

---

## 📁 System Folder Structure

```text
src/
├── config/       # Database connection configs
├── controllers/  # Route controller handlers
├── middlewares/  # Express middlewares (auth, role, rate limiter, error)
├── models/       # Mongoose Schemas & Models
├── routes/       # Express route definitions
├── seed/         # Data seeding scripts
├── utils/        # Sanitizers, builders, and token generators
├── app.js        # Express app initialization
└── server.js     # Entry port listener
```

---

## 📋 REST API Documentation Catalog

All requests are prefixed with `/api/v1`.

### 🛡️ Authentication APIs
- `POST /auth/register` - Registers a new user.
- `POST /auth/login` - Authenticates user and returns JWT token.

### 🚗 Booking APIs (Protected: JWT Bearer Token Required)
- `GET /bookings` - Get all bookings (with dynamic pagination, filtering, search, and sorting).
- `POST /bookings` - Create a booking.
- `GET /bookings/:id` - Get a single booking.
- `PUT /bookings/:id` - Update a booking.
- `DELETE /bookings/:id` - Hard delete a booking.
- `PATCH /bookings/:id/status` - Update booking status.
- `PATCH /bookings/:id/soft-delete` - Soft delete a booking.
- `GET /bookings/status/:status` - Get bookings by status.
- `GET /bookings/vehicle/:vehicleType` - Get bookings by vehicle type.
- `GET /bookings/customer/:customerName` - Get bookings by customer name.
- `GET /bookings/payment/:paymentMethod` - Get bookings by payment method.

### 📊 Analytics APIs
- `GET /analytics/booking-stats` - Total stats compiled by status.
- `GET /analytics/success-rate` - Platform completion success rate percentage.
- `GET /analytics/top-vehicles` - Most booked vehicle types sorted descending.
- `GET /analytics/highest-fare` - List of top 10 highest-fare rides.
- `GET /analytics/monthly-rides` - Monthly ride trends sorted chronologically.

### 👑 Admin APIs (Protected: JWT & Administrator Role Guard Required)
- `GET /admin/dashboard` - Global platform counters (bookings, users, actives).
- `GET /admin/users` - Fetch all system users.
- `GET /admin/users/:id` - Get detail of a specific user.
- `PATCH /admin/users/:id/role` - Update user authorization role (`user` / `admin`).
- `PATCH /admin/users/:id/status` - Toggles user account activity status.

### 🩺 Health Monitoring
- `GET /health` - Returns server status, timestamp, and environment.

---

## 🔒 Security & Optimization Blueprint

1. **MongoDB Indexing**: Indexes compile queries in $O(1)$ B-Tree scans. Fields with dedicated indexing:
   - `User.email`
   - `Booking.bookingStatus`
   - `Booking.vehicleType`
   - `Booking.bookingDate`
   - `Booking.paymentMethod`
2. **Memory Throttling via Lean**: Append `.lean()` to Mongoose read-only operations to retrieve plain POJOs directly, reducing CPU overhead.
3. **ReDoS Vulnerability Protection**: Search and parameter matches sanitize inputs by escaping regular expression characters.
