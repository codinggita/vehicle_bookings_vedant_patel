const express = require("express");
const router = express.Router();
const { createBooking, getAllBookings } = require("../controllers/booking.controller");

// POST /api/v1/bookings
router.post("/", createBooking);

// GET /api/v1/bookings
router.get("/", getAllBookings);

module.exports = router;
