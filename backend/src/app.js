const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bookingRoutes = require("./routes/booking.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// API Routes
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/auth", authRoutes);

module.exports = app;
