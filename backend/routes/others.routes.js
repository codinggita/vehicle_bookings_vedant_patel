const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const {
  getCustomers,
  getVehicles,
  getSuccessRides,
  getCancelledRides,
  getIncompleteRides,
  getRatings,
  getPayments,
  
  createCustomer,
  updateCustomer,
  deleteCustomer,
  bulkInsertCustomers,
  deleteAllCustomers,
  
  createDriver,
  updateDriver,
  deleteDriver,
  bulkInsertDrivers,
  
  createVehicle,
  updateVehicle,
  deleteVehicle,
  
  createPayment,
  deletePayment,
  
  createRating,
  deleteRating,
  
  createLocation,
  getLocations,
  deleteLocation,
  
  deleteLogs
} = require("../controllers/others.controller");

// Query / pagination
router.get("/customers", protect, getCustomers);
router.get("/vehicles", protect, getVehicles);
router.get("/success-rides", protect, getSuccessRides);
router.get("/cancelled-rides", protect, getCancelledRides);
router.get("/incomplete-rides", protect, getIncompleteRides);
router.get("/ratings", protect, getRatings);
router.get("/payments", protect, getPayments);

// Customer operations
router.post("/customers", protect, createCustomer);
router.post("/customers/bulk-insert", protect, bulkInsertCustomers);
router.delete("/customers/delete-all", protect, deleteAllCustomers);
router.put("/customers/:customerId", protect, updateCustomer);
router.delete("/customers/:customerId", protect, deleteCustomer);

// Driver operations
router.post("/drivers", protect, createDriver);
router.post("/drivers/bulk-insert", protect, bulkInsertDrivers);
router.put("/drivers/:driverId", protect, updateDriver);
router.delete("/drivers/:driverId", protect, deleteDriver);

// Vehicle operations
router.post("/vehicles", protect, createVehicle);
router.put("/vehicles/:vehicleId", protect, updateVehicle);
router.delete("/vehicles/:vehicleId", protect, deleteVehicle);

// Payment operations
router.post("/payments", protect, createPayment);
router.delete("/payments/:paymentId", protect, deletePayment);

// Rating operations
router.post("/ratings", protect, createRating);
router.delete("/ratings/:ratingId", protect, deleteRating);

// Location operations
router.post("/locations", protect, createLocation);
router.get("/locations", protect, getLocations);
router.delete("/locations/:locationId", protect, deleteLocation);

// Log operations
router.delete("/logs/:id", protect, deleteLogs);

module.exports = router;
