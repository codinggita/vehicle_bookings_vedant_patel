const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/booking.controller");

// POST /api/v1/bookings
router.post("/", createBooking);

module.exports = router;
