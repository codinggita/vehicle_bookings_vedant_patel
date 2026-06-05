const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const {
  getTotalBookingsCount,
  getSuccessRidesCount,
  getCancelledRidesCount,
  getIncompleteRidesCount,
  getDriverNotFoundCount,
  getTotalCustomersCount,
  getTopVehicleType,
  getTopPaymentMethod,
  getHighestFare,
  getLowestFare,
} = require("../controllers/stats.controller");

router.get("/total-bookings", protect, getTotalBookingsCount);
router.get("/success-rides", protect, getSuccessRidesCount);
router.get("/cancelled-rides", protect, getCancelledRidesCount);
router.get("/incomplete-rides", protect, getIncompleteRidesCount);
router.get("/driver-not-found", protect, getDriverNotFoundCount);
router.get("/total-customers", protect, getTotalCustomersCount);
router.get("/top-vehicle", protect, getTopVehicleType);
router.get("/top-payment-method", protect, getTopPaymentMethod);
router.get("/highest-fare", protect, getHighestFare);
router.get("/lowest-fare", protect, getLowestFare);

// HEAD for total-bookings
router.head("/total-bookings", protect, (req, res) => res.status(200).end());

module.exports = router;
