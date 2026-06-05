const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bookingRoutes = require("./routes/booking.routes");
const authRoutes = require("./routes/auth.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const adminRoutes = require("./routes/admin.routes");
const healthRoutes = require("./routes/health.routes");
const statsRoutes = require("./routes/stats.routes");
const searchRoutes = require("./routes/search.routes");
const jwtRoutes = require("./routes/jwt.routes");
const protectedRoutes = require("./routes/protected.routes");
const othersRoutes = require("./routes/others.routes");
const apiLimiter = require("./middlewares/rateLimiter.middleware");
const globalErrorHandler = require("./middlewares/error.middleware");

// 1. Initialize Express App
const app = express();

// 2. Body Parsing Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Configure Security Middlewares - CORS
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : true,
    credentials: true
  })
);

// 4. Configure Security Middlewares - Rate Limiting
app.use(apiLimiter);

// 5. Configure Request Logger
app.use(morgan("dev"));

// 6. Mount Application Routes
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/jwt", jwtRoutes);
app.use("/api/v1/protected", protectedRoutes);
app.use("/api/v1", othersRoutes);

// 7. Route 404 Router Fallback
app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "API Route not found"
  });
});

// 8. Register Global Error Handler Middleware
app.use(globalErrorHandler);

module.exports = app;
