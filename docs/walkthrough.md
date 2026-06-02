# Walkthrough - Phase 2: Database Layer Setup

This walkthrough details the verification, index mapping, and relationship configurations completed for the database layer of the Vehicle Booking Backend.

## Completed Specifications

### 1. Reusable Mongoose Client Connection (`src/config/db.js`)
- Successfully imports `mongoose` and binds to the Atlas connection string (`process.env.MONGO_URI`).
- Implements active log notifications representing success or exit codes (`process.exit(1)`) on initial connection failures.

### 2. User Schema (`src/models/user.model.js`)
- Enforces unique email fields via schema configuration.
- Hides the password field by default using `select: false`.
- Enforces structural length ranges on `name`.
- Enforces role validation using Mongoose enum checks.
- Safely removed the redundant index on `email` to clear duplicate index warnings.

### 3. Booking Schema & Relations (`src/models/booking.model.js`)
- Integrated a new relational reference field mapping Bookings to Users:
  ```javascript
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
  ```
- Created a single-field B-Tree index on `userId` to speed up queries fetching individual user histories.
- Setup enums for `bookingStatus` and nested payment formats.
- Retained support for raw parameters (`customerName`, `customerPhone`) for backward compatibility with the raw dataset seed process.

### 4. Soft Delete Configuration
- Integrated `isDeleted` boolean flag parameters (default `false`) on the Booking schema. This supports logical soft-deletions instead of physical database removals.

---

## Verification Testing Results

### 1. Seeding Data Validation Test
Verified by clearing and bulk-inserting all 18,289 records into MongoDB:
```bash
> backend@1.0.0 seed
> node src/seed/importBookings.js

MongoDB Connected: ac-rkmt9ta-shard-00-02.mkuo8ry.mongodb.net
Database connected successfully
Loaded raw dataset with 18289 records
Cleaning dataset...
Clearing existing bookings from database...
Importing bookings...
Bookings inserted successfully! Total records: 18289
Database connection closed gracefully
```
All records successfully formatted, parsed, and mapped cleanly into the new Mongoose schema with `userId` defaults and clean database indexing.

### 2. Runtime Server Boot
Verified by running `npm run dev` to ensure that adding new directories, indices, or schemas did not compromise application initialization:
```bash
Server running on port 5000
MongoDB Connected: ac-rkmt9ta-shard-00-00.mkuo8ry.mongodb.net
```
The Express server boots with zero warnings and zero duplicate index errors.

### 3. Gitignore Relocation
- Added a dedicated, backend-specific `.gitignore` file inside `backend/` to isolate backend-specific build dependencies (`node_modules`), secrets (`.env`), and runtime Telemetry logs.

