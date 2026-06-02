const express = require("express");
const router = express.Router();
const {
  getBookingStats,
  getSuccessRate,
  getTopVehicles,
  getHighestFareBookings,
  getMonthlyRideStats
} = require("../controllers/analytics.controller");

// GET /api/v1/analytics/booking-stats
router.get("/booking-stats", getBookingStats);

// GET /api/v1/analytics/success-rate
router.get("/success-rate", getSuccessRate);

// GET /api/v1/analytics/top-vehicles
router.get("/top-vehicles", getTopVehicles);

// GET /api/v1/analytics/highest-fare
router.get("/highest-fare", getHighestFareBookings);

// GET /api/v1/analytics/monthly-rides
router.get("/monthly-rides", getMonthlyRideStats);

module.exports = router;
