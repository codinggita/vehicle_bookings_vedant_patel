const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const {
  searchGeneral,
  searchBookingsById,
  searchCustomersById,
  searchPaymentByMethod,
  searchVehicleByType,
  searchPickupLocation,
  searchDropLocation,
  searchCancelReason,
  searchIncompleteReason,
  searchDriverRating,
  searchCustomerRating,
} = require("../controllers/search.controller");

// OPTIONS pre-flight
router.options("/", (req, res) => {
  res.setHeader("Allow", "GET, OPTIONS");
  res.status(200).end();
});

router.get("/", protect, searchGeneral);
router.get("/bookings", protect, searchBookingsById);
router.get("/customers", protect, searchCustomersById);
router.get("/payment", protect, searchPaymentByMethod);
router.get("/vehicle", protect, searchVehicleByType);
router.get("/location", protect, (req, res, next) => {
  if (req.query.pickup) return searchPickupLocation(req, res, next);
  if (req.query.drop) return searchDropLocation(req, res, next);
  return res.status(400).json({ success: false, message: "Query parameter pickup or drop required" });
});
router.get("/cancel-reason", protect, searchCancelReason);
router.get("/incomplete", protect, searchIncompleteReason);
router.get("/rating", protect, (req, res, next) => {
  if (req.query.driver) return searchDriverRating(req, res, next);
  if (req.query.customer) return searchCustomerRating(req, res, next);
  return res.status(400).json({ success: false, message: "Query parameter driver or customer required" });
});

module.exports = router;
