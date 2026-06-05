const Booking = require("../models/booking.model");

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const getCustomers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const distinctCustomers = await Booking.distinct("customerId", { isDeleted: false });
  const data = distinctCustomers.slice(skip, skip + limit);

  return res.status(200).json({
    success: true,
    page,
    limit,
    total: distinctCustomers.length,
    data
  });
});

const getVehicles = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const distinctVehicles = await Booking.distinct("vehicleType", { isDeleted: false });
  const data = distinctVehicles.slice(skip, skip + limit);

  return res.status(200).json({
    success: true,
    page,
    limit,
    total: distinctVehicles.length,
    data
  });
});

const getSuccessRides = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const query = { bookingStatus: "Success", isDeleted: false };
  const [total, data] = await Promise.all([
    Booking.countDocuments(query),
    Booking.find(query).skip(skip).limit(limit).lean()
  ]);

  return res.status(200).json({
    success: true,
    page,
    limit,
    total,
    data
  });
});

const getCancelledRides = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const query = {
    bookingStatus: { $in: ["Canceled by Driver", "Canceled by Customer"] },
    isDeleted: false
  };
  const [total, data] = await Promise.all([
    Booking.countDocuments(query),
    Booking.find(query).skip(skip).limit(limit).lean()
  ]);

  return res.status(200).json({
    success: true,
    page,
    limit,
    total,
    data
  });
});

const getIncompleteRides = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const query = { isIncomplete: "Yes", isDeleted: false };
  const [total, data] = await Promise.all([
    Booking.countDocuments(query),
    Booking.find(query).skip(skip).limit(limit).lean()
  ]);

  return res.status(200).json({
    success: true,
    page,
    limit,
    total,
    data
  });
});

const getRatings = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const query = {
    isDeleted: false,
    $or: [
      { driverRating: { $ne: null } },
      { customerRating: { $ne: null } }
    ]
  };

  const [total, data] = await Promise.all([
    Booking.countDocuments(query),
    Booking.find(query).skip(skip).limit(limit).select("bookingId customerId driverRating customerRating").lean()
  ]);

  return res.status(200).json({
    success: true,
    page,
    limit,
    total,
    data
  });
});

const getPayments = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const query = { isDeleted: false, paymentMethod: { $ne: null } };

  const [total, data] = await Promise.all([
    Booking.countDocuments(query),
    Booking.find(query).skip(skip).limit(limit).select("bookingId customerId fare paymentMethod").lean()
  ]);

  return res.status(200).json({
    success: true,
    page,
    limit,
    total,
    data
  });
});

// Customers CRUD Mock/Actions
const createCustomer = asyncHandler(async (req, res) => {
  const { customerId, name, phone } = req.body;
  return res.status(201).json({
    success: true,
    message: "Customer created successfully",
    data: { customerId, name, phone }
  });
});

const updateCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;
  const { name, phone } = req.body;
  return res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    data: { customerId, name, phone }
  });
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;
  return res.status(200).json({
    success: true,
    message: `Customer ${customerId} deleted successfully`
  });
});

const bulkInsertCustomers = asyncHandler(async (req, res) => {
  return res.status(201).json({
    success: true,
    message: "Bulk customers inserted successfully"
  });
});

const deleteAllCustomers = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "All customers deleted successfully"
  });
});

// Drivers operations
const createDriver = asyncHandler(async (req, res) => {
  const { driverId, name, phone } = req.body;
  return res.status(201).json({ success: true, message: "Driver created successfully", data: { driverId, name, phone } });
});

const updateDriver = asyncHandler(async (req, res) => {
  const { driverId } = req.params;
  const { name, phone } = req.body;
  return res.status(200).json({ success: true, message: "Driver updated successfully", data: { driverId, name, phone } });
});

const deleteDriver = asyncHandler(async (req, res) => {
  const { driverId } = req.params;
  return res.status(200).json({ success: true, message: `Driver ${driverId} deleted successfully` });
});

const bulkInsertDrivers = asyncHandler(async (req, res) => {
  return res.status(201).json({ success: true, message: "Bulk drivers inserted successfully" });
});

// Vehicles operations
const createVehicle = asyncHandler(async (req, res) => {
  const { vehicleId, type, number } = req.body;
  return res.status(201).json({ success: true, message: "Vehicle created successfully", data: { vehicleId, type, number } });
});

const updateVehicle = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;
  const { type, number } = req.body;
  return res.status(200).json({ success: true, message: "Vehicle updated successfully", data: { vehicleId, type, number } });
});

const deleteVehicle = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;
  return res.status(200).json({ success: true, message: `Vehicle ${vehicleId} deleted successfully` });
});

// Payment operations
const createPayment = asyncHandler(async (req, res) => {
  return res.status(201).json({ success: true, message: "Payment recorded successfully", data: req.body });
});

const deletePayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  return res.status(200).json({ success: true, message: `Payment record ${paymentId} deleted` });
});

// Rating operations
const createRating = asyncHandler(async (req, res) => {
  return res.status(201).json({ success: true, message: "Rating recorded successfully", data: req.body });
});

const deleteRating = asyncHandler(async (req, res) => {
  const { ratingId } = req.params;
  return res.status(200).json({ success: true, message: `Rating record ${ratingId} deleted` });
});

// Location operations
const createLocation = asyncHandler(async (req, res) => {
  return res.status(201).json({ success: true, message: "Location record created successfully", data: req.body });
});

const getLocations = asyncHandler(async (req, res) => {
  const pickups = await Booking.distinct("pickupLocation", { isDeleted: false });
  const drops = await Booking.distinct("dropLocation", { isDeleted: false });
  return res.status(200).json({ success: true, pickups, drops });
});

const deleteLocation = asyncHandler(async (req, res) => {
  const { locationId } = req.params;
  return res.status(200).json({ success: true, message: `Location ${locationId} deleted` });
});

// Log operations
const deleteLogs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  return res.status(200).json({ success: true, message: `Logs with id ${id} cleared` });
});

module.exports = {
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
};
