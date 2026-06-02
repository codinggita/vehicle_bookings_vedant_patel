# Walkthrough - Phase 1: Backend Initialization

This walkthrough documents the verified baseline initialization and folder architectural structure of the Express/Mongoose backend for the Vehicle Booking System.

## Completed Specifications

### 1. MVC Directory Structural Architecture
The project is organized into a modular, decoupled hierarchy of files:
- **`src/config/`**: Third-party service configurations (e.g. `db.js` for MongoDB Atlas client setup).
- **`src/controllers/`**: Standard MVC Request-Response controllers.
- **`src/middlewares/`**: Custom HTTP request middleware pipelines (authorization filters, role authorization, rate limiter, custom JSON errors).
- **`src/models/`**: Mongoose document mapping schemas (`user.model.js` and `booking.model.js`).
- **`src/routes/`**: Express Router mappings (`auth.routes.js`, `booking.routes.js`, `analytics.routes.js`, `admin.routes.js`, `health.routes.js`).
- **`src/services/`**: Decoupled service layer.
- **`src/utils/`**: Shared core scripts (pagination helper, filtering logic, sorting tools, asynchronous route catch-wrappers).
- **`src/seed/`**: Datastore seed processors.

### 2. Express Server Architecture (`src/app.js`)
Handles:
- Body parser filters (`express.json()`, `express.urlencoded({ extended: true })`).
- Security rules (`cors` integration, CORS domain configuration per-environment).
- Application logging (`morgan("dev")` format).
- API Rate Limiter (`express-rate-limit` setup protecting server from resource exhaustion).
- Route mounts for all core system services (/api/v1/auth, /api/v1/bookings, /api/v1/analytics, /api/v1/admin, /api/v1/health).
- Global Exception Handler middleware (`middlewares/error.middleware.js`) catching CastErrors, ValidationErrors, and Mongoose Index violations.

### 3. Database Bootstrap Bootloader (`src/server.js`)
Configured to load standard environment variables immediately at process start using `dotenv.config()`, initialize connection to MongoDB Atlas, and construct the server HTTP listener on the configured port.

### 4. Configuration Manifest (`.env`)
Maintains runtime context for:
- `PORT`: Server port listener (default: `5000`).
- `MONGO_URI`: Remote MongoDB cluster URI string.
- `JWT_SECRET`: Standard secret key.
- `NODE_ENV`: Runtime execution flag.

---

## Verification Testing Results

### 1. Server Launch and Database Hook Validation
Tested via execution of the Node development script (`npm run dev`):
```bash
> backend@1.0.0 dev
> nodemon src/server.js

[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/server.js`

Server running on port 5000
MongoDB Connected: ac-rkmt9ta-shard-00-00.mkuo8ry.mongodb.net
```
No initialization exceptions or connectivity issues were encountered.

### 2. Health Endpoint Probe Response
Verified via curl request:
```bash
$ curl -s http://localhost:5000/api/v1/health
{"success":true,"message":"Server is running","timestamp":"2026-06-02T06:00:16.895Z","environment":"development"}
```
Returns 200 OK with success flag and verified development environment identifier.
