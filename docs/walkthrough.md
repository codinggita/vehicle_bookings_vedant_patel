# Walkthrough - Phase 2: Database Setup & Cleanup

This walkthrough details the database configurations, schemas, index strategies, relationship definitions, soft delete strategies, and cleanup operations completed.

## Completed Specifications

### 1. MongoDB Connection Setup & User Schema
- Setup Mongoose client connection in `src/config/db.js` with Promise-based return hooks and process failure exit blocks.
- Managed user schema models inside `src/models/user.model.js` supporting unique email validation, length ranges on names, and Mongoose enum parameters for user roles.

### 2. Booking Schema & Relations
- Created `userId` reference mappings linking bookings to the user collection model.
- Added a single-field index on `userId` (`bookingSchema.index({ userId: 1 })`) inside the booking schema to maximize query performance under load.
- Added `isDeleted` soft-delete logical flag parameters to prevent physical deletion of booking entries.

### 3. Gitignore Management
- Removed the redundant `.gitignore` file from the workspace root directory (outside the backend folder).
- Ensured `backend/.gitignore` is fully active and restored to safely protect production dependencies (`node_modules/`) and sensitive configurations (`.env`) from public source control exposure.

### 4. Postman Collections & Folder Cleanups
- Deleted the two Postman JSON collection files (`Vehicle-Booking-System.postman_collection.json` and `Vehicle_Bookings_API.postman_collection.json`) located in the root workspace directory.
- Removed the newly created folders (`backend/src/constants/`, `backend/src/docs/`, and `backend/src/validators/`) inside the backend source tree.

---

## Verification Testing Results

### 1. Seeding Data Validation Test
Verified by clearing and bulk-inserting all 18,289 records into MongoDB Atlas using `npm run seed`:
```bash
MongoDB Connected: ac-rkmt9ta-shard-00-02.mkuo8ry.mongodb.net
Database connected successfully
Loaded raw dataset with 18289 records
Importing bookings...
Bookings inserted successfully! Total records: 18289
```

### 2. Git Status and Tracked Entries
Run `git status` to ensure Postman collection files and newly created MVC folders are deleted:
```bash
Changes to be committed:
	deleted:    backend/src/constants/index.js
	deleted:    backend/src/docs/architecture_notes.md
	deleted:    backend/src/validators/.gitkeep
```
No untracked `.env` or `node_modules` are staged for commit.
