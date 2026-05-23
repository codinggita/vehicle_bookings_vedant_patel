const express = require("express");
const router = express.Router();
const { 
  createBooking, 
  getAllBookings, 
  getBookingById,
  updateBooking,
  updateBookingStatus
} = require("../controllers/booking.controller");

// POST /api/v1/bookings
router.post("/", createBooking);

// GET /api/v1/bookings
router.get("/", getAllBookings);

// GET /api/v1/bookings/:id
router.get("/:id", getBookingById);

// PUT /api/v1/bookings/:id
router.put("/:id", updateBooking);

// PATCH /api/v1/bookings/:id/status
router.patch("/:id/status", updateBookingStatus);

module.exports = router;
