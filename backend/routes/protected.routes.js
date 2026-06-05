const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const {
  getAllBookings,
  createBooking,
  deleteBooking
} = require("../controllers/booking.controller");

router.use(protect);

router.get("/bookings", getAllBookings);
router.post("/bookings", createBooking);
router.delete("/bookings/:id", deleteBooking);

module.exports = router;
