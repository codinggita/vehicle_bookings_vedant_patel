# 🚖 VehicleBooking 

### Manage Bookings. Optimize Analytics. Streamline Workforce Operations.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=F637EC)

---

# 🚀 Production-Grade Vehicle Booking Backend System

VehicleSphere is a modern, high-performance **Vehicle Booking Backend API System** built using **Node.js, Express.js, and MongoDB** to simplify vehicle booking operations, user authentication, statistics calculations, and administrator workforce dashboards.

This platform replaces manual tracking spreadsheets with a highly secure, optimized, and scalable backend solution.

---

# 🔗 Important Links

| Resource | Link |
|----------|------|
| 🌐 Live API Deployment | Coming Soon |
| 📄 Swagger/Postman Documentation | [walkthrough.md](file:///d:/Vehicle_Bookings/docs/walkthrough.md) |
| 🔀 GitHub Repository | [GitHub Repo](https://github.com/vedantxy/vehicle_bookings_vedant_patel) |
| 📊 System Design Blueprint | [architecture_notes.md](file:///d:/Vehicle_Bookings/backend/src/docs/architecture_notes.md) |
| 📄 Implementation Plans | [implementation_plan.md](file:///d:/Vehicle_Bookings/docs/implementation_plan.md) |

---

# 📖 Problem Statement

Many transport agencies and logistics providers manage vehicle bookings manually using fragmented tools. This creates:

- Vehicle data management issues
- Difficult booking history tracking
- Inconsistent data types and dirty parameters in raw entries
- Lack of centralized, real-time dashboards
- Slow analytical reporting on top vehicle categories and cancellation rates
- Unsecured endpoints without appropriate authorization limits

---

# 💡 Solution

VehicleSphere provides a centralized, standard-compliant RESTful database backbone where transport agencies can:

- Manage vehicle bookings seamlessly
- Run fast filters across fare, distance, status, and rating values
- Verify real-time statistics utilizing optimized aggregation queries
- Leverage role-based auth controls to safeguard write accesses
- Access standardized and sanitized historical records of 18,289 rides

---

# ✨ Key Features

## 🔐 Authentication & RBAC

- Secure User Registration & Logins
- Salted Hashing via bcryptjs
- JWT Token Authentication
- Role-Based Access Controls (RBAC: `user` / `admin` scopes)

## 🚖 Booking Management

- Add / Create Bookings
- Edit / Full Updates
- Soft-Delete protections using logical status parameters (`isDeleted: true`)
- Advanced Dynamic Filtering (status, vehicle type, rating, fare, distance ranges)
- ESCAPE-protected search preventing ReDoS exploits

## 📊 Analytics Engine

- Centralized Statistics grouped by ride states
- Ride success rate percentage calculations
- Popular vehicle categories sorted descending
- Top-10 highest-paying trips
- Chronological monthly ride trend insights

## ⚙️ Core System Features

- Dynamic Pagination (`limit`, `page`, `skip` boundaries)
- Standardized Sorting on designated whitelists
- Modular MVC Separation of concerns (Controllers, Services, Models)
- Global Central Exception Handling middleware
- High-Speed MongoDB indices (B-Trees)
- Environment-based settings configuration

---

# 💻 Tech Stack

## Backend Core
- **Node.js** - High-speed runtime environment
- **Express.js (v5)** - Light, robust framework
- **MongoDB** - Document datastore
- **Mongoose** - Object Data Modeling (ODM) library

## Security & Telemetry
- **JSON Web Tokens (JWT)** - Token authentication
- **bcryptjs** - Salted password hashing
- **express-rate-limit** - API throttling (DDoS defense)
- **morgan & dotenv** - Observation telemetry and environmental variables

---

# 📂 Folder Structure

```bash
vehicle-bookings/
│── README.md
│── docs/
│   ├── implementation_plan.md    # Architectural design blueprints
│   ├── task.md                   # Task checklist trackers
│   └── walkthrough.md            # Completed walkthrough logs
│
├── backend/
│   ├── data/
│   │   ├── bookings.json         # Raw booking dataset (18,289 entries)
│   │   └── bookings_sample_preview.json
│   │
│   ├── src/
│   │   ├── config/               # Database client setups
│   │   ├── constants/            # Global enums, scopes, and definitions
│   │   ├── controllers/          # Standard request handlers
│   │   ├── docs/                 # Data flow sheets and architectural notes
│   │   ├── middlewares/          # JWT auth, role validation, error catches
│   │   ├── models/               # Mongoose schema setups (User, Booking)
│   │   ├── routes/               # API endpoint routes mapping
│   │   ├── seed/                 # Database parsing seed processors
│   │   ├── services/             # Decoupled business logic triggers
│   │   ├── utils/                # Pagination, builders, and token helpers
│   │   └── validators/           # Request schema validations
│   │
│   ├── .env                      # Environment config (ignored in git)
│   ├── .env.example              # Environment template config
│   └── package.json              # Project manifest parameters
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/vedantxy/vehicle_bookings_vedant_patel.git
```

## Configure Environment Parameters

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_signing_key
JWT_EXPIRES_IN=7d
```

## Install Dependencies

```bash
cd backend
npm install
```

## Parse & Seed Data (18,289 Records)

```bash
npm run seed
```

## Launch Development Server

```bash
npm run dev
```

---

# 🌐 API Base URL

```bash
http://localhost:5000/api/v1
```

---

# 📡 Main API Routes

## 🔐 Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Authenticate user & get JWT token |

## 🚖 Booking Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /bookings | Get all bookings (paginated, filtered, sorted, searched) |
| POST | /bookings | Create a new booking request |
| GET | /bookings/:id | Retrieve booking details by ID |
| PUT | /bookings/:id | Replace/Update booking details |
| PATCH | /bookings/:id/status | Update a booking's status |
| PATCH | /bookings/:id/soft-delete | Soft delete a booking |
| GET | /bookings/status/:status | Filter bookings by status enums |
| GET | /bookings/vehicle/:vehicleType | Filter bookings by vehicle category |
| GET | /bookings/customer/:customerName | Search bookings by customer name (partial case-insensitive) |
| GET | /bookings/payment/:paymentMethod | Filter bookings by payment method enums |

## 📊 Analytics Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /analytics/booking-stats | Retrieve aggregate booking stats grouped by status |
| GET | /analytics/success-rate | Calculate completion success rate percentage |
| GET | /analytics/top-vehicles | Popular vehicle categories sorted descending |
| GET | /analytics/highest-fare | Top 10 highest-paying trips |
| GET | /analytics/monthly-rides | Chronological monthly booking trends |

## 👑 Admin Routes (Protected: Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /admin/dashboard | Access overall platform counters (bookings, users, actives) |
| GET | /admin/users | Fetch all system users |
| GET | /admin/users/:id | Fetch specific user profile details |
| PATCH | /admin/users/:id/role | Update user role (`user` / `admin`) |
| PATCH | /admin/users/:id/status | Toggle user active status |

## 🩺 Health Check Route

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Returns API status, timestamp, and environment |

---

# 📸 Project Screenshots

### 📊 Backend Seeding Verification

![Seeding Verification](https://via.placeholder.com/1200x700.png?text=Database+Seeding+Import+18,289+Records)

### 🩺 Health Probe Check

![Health Status Response](https://via.placeholder.com/1200x700.png?text=Health+Status+Endpoint+Response)

---

# 📊 Future Improvements

- Driver Matching Algorithm Optimization
- Real-time Location Updates via WebSockets
- Automated Fare Matrix Adjustment Engine
- Payment Gateway Integrations (Stripe, Razorpay)
- Multi-factor User Authorization Options (2FA)
- PDF/Excel Booking Report Exports

---

# 📄 Documentation Notes

- APIs verified using Postman Collections
- Standard MVC Separation of concerns followed strictly
- RESTful HTTP Status guidelines implemented
- B-Tree Index optimizations configured for email, statuses, types, and user references
- Normalized data types parsing 18,289 raw dataset anomalies cleanly

---

# 👨💻 Author

## Vedant Patel

Backend Engineer | Scalable System Architect

Passionate about designing modular backend architectures, highly performant MongoDB query aggregations, clean APIs, and secure access systems.

---

# 🙌 Thank You

Thank you for visiting this project repository.

If you found this project helpful, please consider giving it a ⭐ on GitHub.
