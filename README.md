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
│   │   ├── bookings.json                # Full dataset (18,289 records, ~10 MB)
│   │   └── bookings_sample_preview.json # Sample preview (20 records)
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

## 📊 Dataset Overview — 18,289 Real Ride-Hailing Records

This project uses a **massive real-world dataset** containing **18,289 vehicle booking records** from a ride-hailing platform (similar to Ola/Uber). The data covers ride bookings across **50 locations in Bangalore, India** during **July 2024**.

> 📁 **Full Dataset:** [`backend/data/bookings.json`](backend/data/bookings.json) (~10 MB, 18,289 records)
> 👁️ **Preview (20 records):** [`backend/data/bookings_sample_preview.json`](backend/data/bookings_sample_preview.json)

### 📈 Key Statistics at a Glance

| Metric | Value |
| :--- | ---: |
| **Total Booking Records** | 18,289 |
| **Dataset Size** | ~10 MB |
| **Unique Locations (Bangalore)** | 50 |
| **Total Ride Revenue** | ₹1,00,27,196 |
| **Total Distance Covered** | 2,58,782 km |
| **Average Driver Rating** | ⭐ 4.00 / 5.0 |
| **Average Customer Rating** | ⭐ 3.99 / 5.0 |

### 🚗 Vehicle Type Distribution

| Vehicle Type | Total Bookings | Share |
| :--- | ---: | ---: |
| eBike | 2,681 | 14.7% |
| Bike | 2,656 | 14.5% |
| Prime Sedan | 2,637 | 14.4% |
| Auto | 2,632 | 14.4% |
| Prime SUV | 2,630 | 14.4% |
| Mini | 2,552 | 13.9% |
| Prime Plus | 2,501 | 13.7% |

### 📋 Booking Status Breakdown

| Status | Count | Share |
| :--- | ---: | ---: |
| ✅ Success | 11,340 | 62.0% |
| ❌ Canceled by Driver | 3,280 | 17.9% |
| 🚫 Canceled by Customer | 1,862 | 10.2% |
| 🔍 Driver Not Found | 1,807 | 9.9% |

### 💳 Payment Method Distribution

| Payment Method | Count | Share |
| :--- | ---: | ---: |
| Not Applicable (Canceled/Failed) | 6,949 | 38.0% |
| Cash | 6,222 | 34.0% |
| UPI | 4,578 | 25.0% |
| Credit Card | 434 | 2.4% |
| Debit Card | 106 | 0.6% |

### 🗂️ Dataset Schema (19 Fields Per Record)

| # | Field Name | Type | Description |
| :---: | :--- | :--- | :--- |
| 1 | `Date` | String | Booking date & time (`YYYY-MM-DD HH:mm:ss`) |
| 2 | `Time` | String | Booking time (`HH:mm:ss`) |
| 3 | `Booking_ID` | String | Unique booking reference (e.g., `CNR7153255142`) |
| 4 | `Booking_Status` | String | `Success`, `Canceled by Driver`, `Canceled by Customer`, `Driver Not Found` |
| 5 | `Customer_ID` | String | Unique customer ID (e.g., `CID713523`) |
| 6 | `Vehicle_Type` | String | `Prime Sedan`, `Prime SUV`, `Prime Plus`, `Mini`, `Auto`, `Bike`, `eBike` |
| 7 | `Pickup_Location` | String | Pickup area in Bangalore (50 unique locations) |
| 8 | `Drop_Location` | String | Drop area in Bangalore (50 unique locations) |
| 9 | `V_TAT` | Number | Vehicle Turnaround Time (minutes) |
| 10 | `C_TAT` | Number | Customer Turnaround Time (minutes) |
| 11 | `Canceled_Rides_by_Customer` | String | Cancellation reason by customer |
| 12 | `Canceled_Rides_by_Driver` | String | Cancellation reason by driver |
| 13 | `Incomplete_Rides` | String | Whether ride was incomplete (`Yes` / `No`) |
| 14 | `Incomplete_Rides_Reason` | String | `Customer Demand`, `Vehicle Breakdown`, `Other Issue` |
| 15 | `Booking_Value` | Number | Fare amount in ₹ |
| 16 | `Payment_Method` | String | `Cash`, `UPI`, `Credit Card`, `Debit Card` |
| 17 | `Ride_Distance` | Number | Distance in km |
| 18 | `Driver_Ratings` | Number | Driver rating (1.0 - 5.0) |
| 19 | `Customer_Rating` | Number | Customer rating (1.0 - 5.0) |

### 🔍 Sample Record

```json
{
  "Date": "2024-07-26 14:00:00",
  "Time": "14:00:00",
  "Booking_ID": "CNR7153255142",
  "Booking_Status": "Canceled by Driver",
  "Customer_ID": "CID713523",
  "Vehicle_Type": "Prime Sedan",
  "Pickup_Location": "Tumkur Road",
  "Drop_Location": "RT Nagar",
  "V_TAT": "null",
  "C_TAT": "null",
  "Canceled_Rides_by_Customer": "null",
  "Canceled_Rides_by_Driver": "Personal & Car related issue",
  "Incomplete_Rides": "null",
  "Incomplete_Rides_Reason": "null",
  "Booking_Value": "444",
  "Payment_Method": "null",
  "Ride_Distance": "0",
  "Driver_Ratings": "null",
  "Customer_Rating": "null"
}
```

### 📍 All 50 Bangalore Locations Covered

<details>
<summary>Click to expand full location list</summary>

BTM Layout, Banashankari, Bannerghatta Road, Basavanagudi, Bellandur, Chamarajpet, Chickpet, Cox Town, Devanahalli, Electronic City, Frazer Town, HSR Layout, Hebbal, Hennur, Hosur Road, Hulimavu, Indiranagar, JP Nagar, Jayanagar, KR Puram, Kadugodi, Kammanahalli, Kengeri, Koramangala, Langford Town, MG Road, Magadi Road, Majestic, Malleshwaram, Marathahalli, Mysore Road, Nagarbhavi, Padmanabhanagar, Peenya, RT Nagar, Rajajinagar, Rajarajeshwari Nagar, Ramamurthy Nagar, Richmond Town, Sahakar Nagar, Sarjapur Road, Shantinagar, Shivajinagar, Tumkur Road, Ulsoor, Varthur, Vijayanagar, Whitefield, Yelahanka, Yeshwanthpur

</details>

### ⚠️ Dirty Data Patterns Found

The raw dataset contains several dirty data issues that our `dataCleaner.js` utility handles:

| Dirty Pattern | Example | Fields Affected | Handling |
| :--- | :--- | :--- | :--- |
| String `"null"` instead of actual `null` | `"V_TAT": "null"` | V_TAT, C_TAT, Ratings, Payment | Convert to native `null` |
| Corrupt Excel values | `"Vehicle Images": "#NAME?"` | Vehicle Images | Skip field entirely |
| Numbers stored as strings | `"Booking_Value": "444"` | Fare, Distance, Ratings | Parse to `Number` |
| BOM character in key | `"﻿Date"` | Date field | Strip BOM (`\uFEFF`) |
| Empty string keys | `"": ""` | Trailing empty field | Skip entirely |

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
