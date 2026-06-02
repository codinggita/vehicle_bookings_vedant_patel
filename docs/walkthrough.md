# Walkthrough - Phase 1: Folder Architecture Setup

This walkthrough details the successful establishment and modular verification of the folder architecture structure for the Express/Mongoose backend of the Vehicle Booking System.

## Completed Specifications

### 1. Expanded MVC Structural Architecture
We successfully designed and verified the expanded folder layout under `/src`:
- **`config/`**: Setup for MongoDB client connection.
- **`controllers/`**: Extracts parameters and formats HTTP responses.
- **`services/`**: Holds logic, database operations, and Mongoose query executions.
- **`routes/`**: Handles endpoint path definitions.
- **`middlewares/`**: Manages authorization filters and error exception captures.
- **`models/`**: Manages database document mapping schemas.
- **`validators/`**: Rigorously validates incoming requests (contains baseline tracker `.gitkeep`).
- **`utils/`**: Shared core scripts (pagination, filter builders).
- **`constants/`**: Prevents system-wide string duplication (holds user roles, booking states in `src/constants/index.js`).
- **`docs/`**: API design reference sheets and Postman collections (holds `src/docs/architecture_notes.md`).

### 2. Implementation of System Enums (`src/constants/index.js`)
We introduced a centralized, immutable catalog of definitions to keep model validations and business queries clean:
- `USER_ROLES`: Maps authorization scopes (`"user"`, `"admin"`).
- `BOOKING_STATUS`: Maps booking lifecycle states (`"pending"`, `"confirmed"`, `"completed"`, `"cancelled"`).
- `PAYMENT_METHOD`: Defines accepted payments (`"cash"`, `"card"`, `"upi"`, `"net_banking"`).
- `PAYMENT_STATUS`: Maps transaction states (`"pending"`, `"paid"`, `"failed"`, `"refunded"`).
- `VEHICLE_TYPE`: Structures vehicle classes (`"sedan"`, `"suv"`, `"hatchback"`, `"luxury"`, `"mini"`, `"plus"`, `"bike"`, `"ebike"`, `"auto"`).

---

## Verification Testing Results

### 1. Directory Structure Integrity Check
Tested via standard `git status` which registers the newly introduced folders:
```bash
Untracked files:
	backend/src/constants/
	backend/src/docs/
	backend/src/validators/
```
All folders correctly contain their tracking or configuration assets.

### 2. Runtime Bootstrap & Integration Checks
Verified by running `npm run dev` to ensure that adding new directories or modular constants imports did not compromise Express initialization:
```bash
Server running on port 5000
MongoDB Connected: ac-rkmt9ta-shard-00-02.mkuo8ry.mongodb.net
```
No initialization warnings or structural exceptions occurred.

### 3. API Health Response
Tested using curl probe:
```bash
$ curl -s http://localhost:5000/api/v1/health
{"success":true,"message":"Server is running","timestamp":"2026-06-02T06:05:22.803Z","environment":"development"}
```
Confirmed `200 OK` response.
