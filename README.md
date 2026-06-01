<div align="center">

# 🚖 Vehicle Bookings API

### Full Stack Booking Management System

A scalable and production-ready vehicle booking platform built with modern backend & frontend technologies.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-v9-880000?style=for-the-badge&logoColor=white)](https://mongoosejs.com/)

</div>

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 🚘 Complete Vehicle Booking CRUD Operations
- 📄 Pagination with Configurable Limits
- 🗑️ Soft Delete & Hard Delete Support
- 📊 Admin Dashboard Analytics
- 🔎 Advanced Search, Filter & Pagination
- ⚡ RESTful APIs with MVC Architecture
- 🛡️ Middleware, Validation & Rate Limiting
- 📈 MongoDB Aggregation Pipelines
- 🧹 Automated Data Cleaning & Sanitization
- 🌙 Modern Responsive Dashboard UI

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
| :--- | :--- |
| **Node.js** | Runtime Environment |
| **Express.js v5** | Web Framework |
| **MongoDB Atlas** | Cloud Database |
| **Mongoose v9** | ODM / Schema Modeling |
| **JWT** | Authentication |
| **bcryptjs** | Password Hashing |
| **morgan** | HTTP Request Logger |
| **cors** | Cross-Origin Resource Sharing |
| **express-rate-limit** | API Rate Limiting |
| **dotenv** | Environment Variables |
| **nodemon** | Development Auto-Restart |

### Frontend *(Planned)*
- React + Vite
- Tailwind CSS
- Redux Toolkit
- Axios
- MUI

---

## 📂 Project Structure

```bash
vehicle-bookings/
│
├── backend/
│   ├── data/
│   │   └── bookings.json           # Raw dataset for seeding
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB Atlas connection
│   │   ├── controllers/
│   │   │   └── booking.controller.js  # All booking business logic
│   │   ├── middlewares/             # Custom middleware (auth, validation)
│   │   ├── models/
│   │   │   └── booking.model.js    # Mongoose schema & indexes
│   │   ├── routes/
│   │   │   └── booking.routes.js   # API route definitions
│   │   ├── seed/
│   │   │   └── importBookings.js   # Bulk data import script
│   │   ├── services/               # Business logic layer (planned)
│   │   ├── utils/
│   │   │   ├── dataCleaner.js      # Data sanitization utilities
│   │   │   └── pagination.js       # Reusable pagination helper
│   │   ├── app.js                  # Express app configuration
│   │   └── server.js               # Server entry point
│   ├── .env                        # Environment variables (git-ignored)
│   ├── package.json
│   └── package-lock.json
├── frontend/                       # Frontend (planned)
├── README.md
└── .gitignore
```

---

## 🔗 API Endpoints

Base URL: `/api/v1/bookings`

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/bookings` | Create a new booking | ✅ |
| `GET` | `/api/v1/bookings` | Get all bookings (paginated) | ✅ |
| `GET` | `/api/v1/bookings/:id` | Get a single booking by ID | ✅ |
| `PUT` | `/api/v1/bookings/:id` | Update a booking (full update) | ✅ |
| `PATCH` | `/api/v1/bookings/:id/status` | Update booking status only | ✅ |
| `DELETE` | `/api/v1/bookings/:id` | Hard delete a booking | ✅ |
| `PATCH` | `/api/v1/bookings/:id/soft-delete` | Soft delete a booking | ✅ |

### Pagination Query Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `page` | Number | `1` | Page number |
| `limit` | Number | `10` | Records per page (max: 100) |

**Example:** `GET /api/v1/bookings?page=2&limit=20`

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas Account (or local MongoDB)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vedantxy/vehicle_bookings_vedant_patel.git

# 2. Navigate to the backend directory
cd vehicle_bookings_vedant_patel/backend

# 3. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
NODE_ENV=development
```

### Running the Server

```bash
# Development mode (with hot-reload)
npm run dev

# Production mode
npm start
```

### Seeding the Database

```bash
# Import sample bookings from data/bookings.json
npm run seed
```

---

## 🚀 Project Status

```diff
+ ✅ Backend Planning Completed
+ ✅ Environment Variables Configured (dotenv Setup)
+ ✅ MongoDB Atlas Connection Configured
+ ✅ Dataset Analysis Completed
+ ✅ MongoDB Schema Design Completed (Mongoose Model & Indexes)
+ ✅ Database Seed Script Configured & Executed (Bulk Import)
+ ✅ Data Cleaning Utility Created (sanitizeString, toNumber, toDate)
+ ✅ Create Booking API (POST /api/v1/bookings)
+ ✅ Get All Bookings API with Pagination (GET /api/v1/bookings)
+ ✅ Get Booking by ID API (GET /api/v1/bookings/:id)
+ ✅ Update Booking API (PUT /api/v1/bookings/:id)
+ ✅ Update Booking Status API (PATCH /api/v1/bookings/:id/status)
+ ✅ Hard Delete Booking API (DELETE /api/v1/bookings/:id)
+ ✅ Soft Delete Booking API (PATCH /api/v1/bookings/:id/soft-delete)
+ ✅ Pagination Utility with Configurable Limits
- 🔲 JWT Authentication & Authorization
- 🔲 Rate Limiting Middleware
- 🔲 Frontend Dashboard (React + Vite)
- 🔲 MongoDB Aggregation Pipelines for Analytics
- 🔲 Deployment to Production
```

---

## 🎯 Goal

Build an industry-level full stack booking platform with:

- Clean MVC Architecture
- Scalable RESTful APIs
- Secure JWT Authentication
- Analytics Dashboard
- Real MongoDB Atlas Integration
- Comprehensive Data Validation & Sanitization
- Soft Delete Pattern for Data Safety

---

## 📊 Phase 2: Dataset Analysis & Data Modeling Strategy

In professional backend architectures, importing external datasets (e.g., CSV/JSON from legacy Excel systems) is highly risky due to dirty data, inconsistent types, and corrupt values. Below is the comprehensive data modeling and transformation strategy for the Vehicle Booking System.

### 1️⃣ Field-Level Specification & Conversion Plan

| Field Name | Raw Type (Legacy) | Expected Type | Common Dirty Values | Required Transformation & Sanitization |
| :--- | :--- | :--- | :--- | :--- |
| **customerName** | String | String | `""`, `"#NAME?"`, `"undefined"` | Trim whitespaces. Replace `"#NAME?"`, `""`, or `"undefined"` with `null`. Capitalize words. |
| **vehicleType** | String | Enum (String) | `"SUV"`, `"suv"`, `"  suv  "` | Trim, convert to lowercase/uppercase to match standard enums: `['sedan', 'suv', 'hatchback', 'luxury']`. |
| **pickupLocation** | String | String | `""`, `"N/A"` | Trim whitespaces. Set to `null` or throw validation error if empty. |
| **dropLocation** | String | String | `""`, `"N/A"` | Trim whitespaces. Set to `null` or throw validation error if empty. |
| **fare** | String / Number | Number | `"444"`, `"N/A"`, `""` | Parse to Float. If parsing fails or value is negative, fallback to `0.0` or trigger alert. |
| **distance** | String / Number | Number | `"12.5 km"`, `"null"`, `"-5"` | Strip non-numeric units (e.g. "km"). Parse to Float. Ensure positive value. |
| **bookingStatus** | String | Enum (String) | `"pending"`, `"PENDING "` | Trim and standardize to: `['pending', 'confirmed', 'completed', 'cancelled']`. |
| **paymentMethod** | String | Enum (String) | `"cash"`, `"CASH"`, `""` | Trim and standardize to: `['cash', 'card', 'upi', 'net_banking']`. |
| **rating** | String / Number | Number | `"4.8"`, `"N/A"`, `"null"` | Parse to Float. Clamp values between `1.0` and `5.0`. Set to `null` if unrated. |
| **bookingDate** | String | Date | `"23-05-2026"`, `"null"` | Parse using standard ISO 8601 parser. Default to current date if missing or corrupt. |

---

### 2️⃣ Bad Value Handling Strategy

Dirty data breaks MongoDB aggregations, schema validations, and analytics charts. We sanitize problematic values as follows:
* **String representation of nulls** (`"null"`, `"undefined"`, `"N/A"`): Transformed to native JavaScript `null` or removed completely if the field is optional.
* **Corrupt Excel values** (`"#NAME?"`): Replaced with `null` or fallback defaults after flagging the record for manual review.
* **Empty strings** (`""`): Standardized to `null` for optional fields to avoid storing useless bytes.
* **Incorrect types** (e.g., `"444"` instead of `444`): Explicitly cast to Numbers or Dates using custom utility wrappers.

---

### 3️⃣ MongoDB Schema & Index Planning

To ensure lightning-fast read operations and database consistency, the main **`bookings`** collection will be structured and indexed under the following plan:

#### Recommended MongoDB Indexes
1. **`bookingStatus`**: High read frequency. Improves query speed for status-based filtering (e.g., active vs. completed bookings).
2. **`vehicleType`**: Essential for matching algorithms and categorizing analytics dashboard metrics.
3. **`bookingDate`**: Critical for time-series aggregation, monthly reports, and date-range queries.
4. **`paymentStatus`**: Frequent queries on payment state for financial reporting.
5. **`customerName`**: Indexed with a text/regular index for fast lookup of customer booking history.

```javascript
// Index Definitions (Implemented)
bookingsSchema.index({ bookingStatus: 1 });
bookingsSchema.index({ vehicleType: 1 });
bookingsSchema.index({ bookingDate: -1 });
bookingsSchema.index({ paymentStatus: 1 });
bookingsSchema.index({ customerName: 1 });
```

---

### 4️⃣ Scalability & Normalization Plan

1. **Schema Validation**: Using Mongoose built-in validators (`min`, `max`, `enum`, `required`) to prevent invalid data from persisting.
2. **Type Consistency**: Absolute type enforcement. Mixed types (e.g., a field containing both Strings and Numbers) are forbidden as they break MongoDB aggregation pipelines.
3. **Audit Trails**: Built-in `createdAt` and `updatedAt` timestamps managed automatically by Mongoose to audit data state changes over time.
4. **Soft Delete Pattern**: Using `isDeleted` boolean flag to preserve data integrity while supporting logical deletion.

---

## 👨‍💻 Developer

**Vedant Patel**

> "Building scalable systems one API at a time."

---

## 📜 License

This project is licensed under the ISC License.
