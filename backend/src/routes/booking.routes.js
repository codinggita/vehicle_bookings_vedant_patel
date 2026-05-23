const express = require("express");
const router = express.Router();
const { createBooking, getAllBookings, getBookingById } = require("../controllers/booking.controller");

// POST /api/v1/bookings
router.post("/", createBooking);

// GET /api/v1/bookings
router.get("/", getAllBookings);

// GET /api/v1/bookings/:id
router.get("/:id", getBookingById);

module.exports = router;
