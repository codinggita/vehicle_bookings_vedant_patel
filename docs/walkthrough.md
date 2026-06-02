# Walkthrough - Phase 0: Dataset Analysis & Database Planning

This walkthrough summarizes the database architecture, field normalizations, index optimizations, and dataset import verification for the Vehicle Booking Backend.

## What Was Completed

### 1. Dataset Analysis & Inconsistency Identification
We analyzed all 18,289 raw booking entries. Key observations resolved:
- **Dirty string nulls:** `"null"` and empty strings parsed cleanly into standard `null` types.
- **Types:** Converted numeric fields (`Booking_Value`, `Ride_Distance`, `V_TAT`, `C_TAT`, `Driver_Ratings`, `Customer_Rating`) from strings into correct floats/integers.
- **Date formats:** Formatted `"YYYY-MM-DD HH:mm:ss"` values into standard, queryable UTC ISO dates.
- **Rating Ranges:** Ratings verified to lie strictly within [3.0, 5.0] when not null.

### 2. Scalable Entity & Relationship Design
Designed a multi-collection structure separating entities for decoupling and transactional scalability:
- **`users`:** Holds user profiles, credentials, active state, and roles (`user` vs `admin`).
- **`bookings`:** Stores booking transactional records referencing `userId` and embedding payments, cancellations, and locations.
- **`vehicles`:** Decoupled representation of classifications (e.g. eBike, Prime Sedan, SUV) to support future hardware metadata.

### 3. MongoDB Optimization & Index Planning
Formulated single-field and compound indexes to accelerate both individual client feeds and admin aggregation pipelines:
- `{ email: 1 }` (Unique) - Fast user auth checks.
- `{ bookingDate: -1 }` - Sorting feeds.
- `{ bookingStatus: 1, bookingDate: -1 }` - Filters and analytics.
- `{ vehicleType: 1, bookingDate: -1 }` - Trend pipelines.

### 4. Verification of Seeding Execution
- Successfully connected to the MongoDB Atlas cluster configured in `.env`.
- Cleared pre-existing data and ran the seeding script.
- Cleanly imported all 18,289 records using the validation and mapping schemas defined.

---

## Technical Specifications & Mapping

### Collection Structures

#### 1. `users` Collection Schema
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
```

#### 2. `bookings` Collection Schema
```javascript
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookingId: { type: String, unique: true },
  vehicleType: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  distance: { type: Number, required: true },
  fare: { type: Number, required: true },
  bookingStatus: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  vTat: { type: Number, default: null },
  cTat: { type: Number, default: null },
  driverRating: { type: Number, default: null },
  customerRating: { type: Number, default: null },
  payment: {
    method: { type: String, default: "cash" },
    status: { type: String, default: "pending" }
  },
  cancellation: {
    reason: { type: String, default: null }
  }
}, { timestamps: true });
```

---

## Verification Results

### Seeding Execution Output
```bash
> backend@1.0.0 seed
> node src/seed/importBookings.js

◇ injected env (4) from .env
MongoDB Connected: ac-rkmt9ta-shard-00-01.mkuo8ry.mongodb.net
Database connected successfully
Loaded raw dataset with 18289 records
Cleaning dataset...
Clearing existing bookings from database...
Importing bookings...
Bookings inserted successfully! Total records: 18289
Database connection closed gracefully
```
All records have been parsed, validated, and normalized successfully without any schema validation or connection errors.
