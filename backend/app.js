const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bookingRoutes = require("./routes/booking.routes");
const authRoutes = require("./routes/auth.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const adminRoutes = require("./routes/admin.routes");
const healthRoutes = require("./routes/health.routes");
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
