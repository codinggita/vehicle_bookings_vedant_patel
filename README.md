<div align="center">

# 🚖 Vehicle Bookings API

### Full Stack Booking Management System

A scalable and production-ready vehicle booking platform built with modern backend & frontend technologies.

</div>

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 🚘 Vehicle Booking Management
- 📊 Admin Dashboard Analytics
- 🔎 Advanced Search, Filter & Pagination
- ⚡ RESTful APIs with MVC Architecture
- 🛡️ Middleware, Validation & Rate Limiting
- 📈 MongoDB Aggregation Pipelines
- 🌙 Modern Responsive Dashboard UI

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Frontend
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
│   │   └── bookings.json
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── booking.controller.js
│   │   ├── models/
│   │   │   └── booking.model.js
│   │   ├── routes/
│   │   │   └── booking.routes.js
│   │   ├── seed/
│   │   │   └── importBookings.js
│   │   ├── utils/
│   │   │   └── dataCleaner.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── node_modules/
├── frontend/
├── README.md
└── .gitignore
```

---

## 🚀 Project Status

```diff
+ Backend Planning Completed
+ Environment Variables Configured (dotenv Setup)
+ MongoDB Atlas Connection Configured
+ Dataset Analysis Completed
+ MongoDB Schema Design Completed (Mongoose Model & Indexes)
+ Database Seed Script Configured & Executed (Bulk Import)
+ Create Booking API Completed (POST /api/v1/bookings)
+ Read Booking APIs Completed (GET /api/v1/bookings & GET /api/v1/bookings/:id)
```

---

## 🎯 Goal

Build an industry-level full stack booking platform with:

- Clean Architecture
- Scalable APIs
- Secure Authentication
- Analytics Dashboard
- Real MongoDB Integration

---

## 👨‍💻 Developer

**Vedant Patel**

> “Building scalable systems one API at a time.”

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
4. **`customerName`**: Indexed with a text/regular index for fast lookup of customer booking history.

```javascript
// Index Definitions Plan
bookingsSchema.index({ bookingStatus: 1 });
bookingsSchema.index({ bookingDate: -1 });
bookingsSchema.index({ customerName: 1 });
```

---

### 4️⃣ Scalability & Normalization Plan

1. **Schema Validation**: Using Mongoose built-in validators (`min`, `max`, `enum`, `required`) to prevent invalid data from persisting.
2. **Type Consistency**: Absolute type enforcement. Mixed types (e.g., a field containing both Strings and Numbers) are forbidden as they break MongoDB aggregation pipelines.
3. **Audit Trails**: Built-in `createdAt` and `updatedAt` timestamps managed automatically by Mongoose to audit data state changes over time.

