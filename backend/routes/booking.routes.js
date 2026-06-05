const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");

// Import all controllers
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  softDeleteBooking,
  
  // Custom GET param routes
  getBookingByCustomId,
  getBookingsByStatus,
  getBookingsByCustomer,
  getBookingsByVehicleType,
  getBookingsByPaymentMethod,
  getBookingsByPickupLocation,
  getBookingsByDropLocation,
  getBookingsByDate,
  getBookingsByTime,
  getBookingsByDriverRating,
  getBookingsByCustomerRating,
  getBookingsByDistance,
  getBookingsByFareValue,
  getBookingsByIncompleteStatus,
  getBookingsByIncompleteReason,
  getBookingsByCancelCustomerReason,
  getBookingsByCancelDriverReason,
  getBookingsByVTAT,
  getBookingsByCTAT,
  getBookingsByDay,
  getBookingsByMonth,
  getBookingsByYear,
  getBookingsByHour,
  getBookingsByMinute,
  getBookingsByPickupSource,
  getBookingsByDestination,
  getBookingsByVehicleImage,
  getBookingsByFare,
  getCustomerBookingHistory,
  getLatestCustomerBooking,
  
  // Advanced GET routes
  getTopHighestFareBookings,
  getTopLowestFareBookings,
  getRecentBookings,
  getLatestBookings,
  getRandomBookings,
  getTrendingBookings,
  getSuccessBookings,
  getCancelledBookings,
  getIncompleteBookings,
  getDriverNotFoundBookings,
  compareBookings,
  getAISummary,
  
  // Extra updates
  updateBookingPayment,
  updateBookingRating,
  updateBookingFare,
  updateBookingDistance,
  updateBookingLocation,
  
  // Bulk and delete operations
  bulkInsertBookings,
  deleteAllBookings,
  deleteCancelledRides,
} = require("../controllers/booking.controller");

// HEAD and OPTIONS pre-flight
router.head("/", protect, (req, res) => {
  res.setHeader("X-Total-Count", "18289");
  res.status(200).end();
});
router.options("/", (req, res) => {
  res.setHeader("Allow", "GET, POST, HEAD, OPTIONS");
  res.status(200).end();
});

router.head("/:id", protect, (req, res) => res.status(200).end());
router.options("/:id", (req, res) => {
  res.setHeader("Allow", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS");
  res.status(200).end();
});

// 1. Static Sub-routes (must come before wildcards)
router.post("/bulk-insert", protect, bulkInsertBookings);
router.delete("/delete-all", protect, deleteAllBookings);
router.delete("/cancelled-rides/delete-all", protect, deleteCancelledRides);

router.get("/top/highest-fare", protect, getTopHighestFareBookings);
router.get("/top/lowest-fare", protect, getTopLowestFareBookings);
router.get("/recent", protect, getRecentBookings);
router.get("/latest", protect, getLatestBookings);
router.get("/random", protect, getRandomBookings);
router.get("/trending", protect, getTrendingBookings);
router.get("/success", protect, getSuccessBookings);
router.get("/cancelled", protect, getCancelledBookings);
router.get("/incomplete", protect, getIncompleteBookings);
router.get("/driver-not-found", protect, getDriverNotFoundBookings);
router.get("/summary/ai", protect, getAISummary);
router.get("/compare", protect, compareBookings);

// 2. Custom Param routes (prefixed or structured to avoid :id collisions)
router.get("/id/:bookingId", protect, getBookingByCustomId);
router.get("/status/:status", protect, getBookingsByStatus);
router.get("/customer/:customerId", protect, getBookingsByCustomer);
router.get("/vehicle/:vehicleType", protect, getBookingsByVehicleType);
router.get("/payment/:method", protect, getBookingsByPaymentMethod);
router.get("/pickup/:location", protect, getBookingsByPickupLocation);
router.get("/drop/:location", protect, getBookingsByDropLocation);
router.get("/date/:date", protect, getBookingsByDate);
router.get("/time/:time", protect, getBookingsByTime);
router.get("/rating/driver/:rating", protect, getBookingsByDriverRating);
router.get("/rating/customer/:rating", protect, getBookingsByCustomerRating);
router.get("/distance/:distance", protect, getBookingsByDistance);
router.get("/value/:amount", protect, getBookingsByFareValue);
router.get("/incomplete/:status", protect, getBookingsByIncompleteStatus);
router.get("/incomplete-reason/:reason", protect, getBookingsByIncompleteReason);
router.get("/cancel/customer/:reason", protect, getBookingsByCancelCustomerReason);
router.get("/cancel/driver/:reason", protect, getBookingsByCancelDriverReason);
router.get("/vtat/:minutes", protect, getBookingsByVTAT);
router.get("/ctat/:minutes", protect, getBookingsByCTAT);
router.get("/day/:day", protect, getBookingsByDay);
router.get("/month/:month", protect, getBookingsByMonth);
router.get("/year/:year", protect, getBookingsByYear);
router.get("/hour/:hour", protect, getBookingsByHour);
router.get("/minute/:minute", protect, getBookingsByMinute);
router.get("/source/:pickup", protect, getBookingsByPickupSource);
router.get("/destination/:drop", protect, getBookingsByDestination);
router.get("/vehicle-image/:imageName", protect, getBookingsByVehicleImage);
router.get("/fare/:value", protect, getBookingsByFare);
router.get("/customer/:customerId/history", protect, getCustomerBookingHistory);
router.get("/customer/:customerId/latest", protect, getLatestCustomerBooking);

// 3. Standard REST CRUD routes
router.post("/", protect, createBooking);
router.get("/", protect, getAllBookings);
router.get("/:id", protect, getBookingById);
router.put("/:id", protect, updateBooking);
router.delete("/:id", protect, deleteBooking);

// 4. Patch Routes
router.patch("/:id/status", protect, updateBookingStatus);
router.patch("/:id/payment", protect, updateBookingPayment);
router.patch("/:id/rating", protect, updateBookingRating);
router.patch("/:id/fare", protect, updateBookingFare);
router.patch("/:id/distance", protect, updateBookingDistance);
router.patch("/:id/location", protect, updateBookingLocation);
router.patch("/:id/soft-delete", protect, softDeleteBooking);

module.exports = router;
