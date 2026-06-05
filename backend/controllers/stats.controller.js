const Booking = require("../models/booking.model");

// Helper wrapper for async endpoints
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const getTotalBookingsCount = asyncHandler(async (req, res) => {
  const count = await Booking.countDocuments({ isDeleted: false });
  return res.status(200).json({ success: true, count });
});

const getSuccessRidesCount = asyncHandler(async (req, res) => {
  const count = await Booking.countDocuments({ bookingStatus: "Success", isDeleted: false });
  return res.status(200).json({ success: true, count });
});

const getCancelledRidesCount = asyncHandler(async (req, res) => {
  const count = await Booking.countDocuments({
    bookingStatus: { $in: ["Canceled by Driver", "Canceled by Customer"] },
    isDeleted: false,
  });
  return res.status(200).json({ success: true, count });
});

const getIncompleteRidesCount = asyncHandler(async (req, res) => {
  const count = await Booking.countDocuments({ isIncomplete: "Yes", isDeleted: false });
  return res.status(200).json({ success: true, count });
});

const getDriverNotFoundCount = asyncHandler(async (req, res) => {
  const count = await Booking.countDocuments({ bookingStatus: "Driver Not Found", isDeleted: false });
  return res.status(200).json({ success: true, count });
});

const getTotalCustomersCount = asyncHandler(async (req, res) => {
  const customers = await Booking.distinct("customerId", { isDeleted: false });
  return res.status(200).json({ success: true, count: customers.length });
});

const getTopVehicleType = asyncHandler(async (req, res) => {
  const result = await Booking.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: "$vehicleType", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]);
  const topVehicle = result.length > 0 ? result[0]._id : null;
  const count = result.length > 0 ? result[0].count : 0;
  return res.status(200).json({ success: true, topVehicle, count });
});

const getTopPaymentMethod = asyncHandler(async (req, res) => {
  const result = await Booking.aggregate([
    { $match: { isDeleted: false, paymentMethod: { $ne: null } } },
    { $group: { _id: "$paymentMethod", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]);
  const topPaymentMethod = result.length > 0 ? result[0]._id : null;
  const count = result.length > 0 ? result[0].count : 0;
  return res.status(200).json({ success: true, topPaymentMethod, count });
});

const getHighestFare = asyncHandler(async (req, res) => {
  const result = await Booking.findOne({ isDeleted: false }).sort({ fare: -1 }).select("fare").lean();
  const highestFare = result ? result.fare : 0;
  return res.status(200).json({ success: true, highestFare });
});

const getLowestFare = asyncHandler(async (req, res) => {
  const result = await Booking.findOne({ isDeleted: false, fare: { $gt: 0 } }).sort({ fare: 1 }).select("fare").lean();
  const lowestFare = result ? result.fare : 0;
  return res.status(200).json({ success: true, lowestFare });
});

module.exports = {
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
};
