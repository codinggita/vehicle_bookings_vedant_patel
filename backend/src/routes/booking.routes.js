const express = require("express");
const router = express.Router();
const { 
  createBooking, 
  getAllBookings, 
  getBookingById,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  softDeleteBooking
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

// DELETE /api/v1/bookings/:id
router.delete("/:id", deleteBooking);

// PATCH /api/v1/bookings/:id/soft-delete
router.patch("/:id/soft-delete", softDeleteBooking);

module.exports = router;
