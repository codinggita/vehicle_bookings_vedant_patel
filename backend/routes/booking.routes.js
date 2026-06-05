const express = require("express");
const router = express.Router();
const { 
  createBooking, 
  getAllBookings, 
  getBookingById,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  softDeleteBooking,
  getBookingsByStatus,
  getBookingsByVehicleType,
  getBookingsByCustomer,
  getBookingsByPaymentMethod
} = require("../controllers/booking.controller");
const { protect } = require("../middlewares/auth.middleware");

// POST /api/v1/bookings
router.post("/", protect, createBooking);

// GET /api/v1/bookings
router.get("/", protect, getAllBookings);

// GET /api/v1/bookings/status/:status
router.get("/status/:status", protect, getBookingsByStatus);

// GET /api/v1/bookings/vehicle/:vehicleType
router.get("/vehicle/:vehicleType", protect, getBookingsByVehicleType);

// GET /api/v1/bookings/customer/:customerName
router.get("/customer/:customerName", protect, getBookingsByCustomer);

// GET /api/v1/bookings/payment/:paymentMethod
router.get("/payment/:paymentMethod", protect, getBookingsByPaymentMethod);

// GET /api/v1/bookings/:id
router.get("/:id", protect, getBookingById);

// PUT /api/v1/bookings/:id
router.put("/:id", protect, updateBooking);

// PATCH /api/v1/bookings/:id/status
router.patch("/:id/status", protect, updateBookingStatus);

// DELETE /api/v1/bookings/:id
router.delete("/:id", protect, deleteBooking);

// PATCH /api/v1/bookings/:id/soft-delete
router.patch("/:id/soft-delete", protect, softDeleteBooking);

module.exports = router;
