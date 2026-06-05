const Booking = require("../models/booking.model");

// Inlined asyncHandler utility to capture async execution errors cleanly
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Get overall booking statistics grouped by status.
 * GET /api/v1/analytics/booking-stats
 */
const getBookingStats = asyncHandler(async (req, res) => {
  const stats = await Booking.aggregate([
    // 1. Exclude soft-deleted bookings
    { $match: { isDeleted: false } },
    // 2. Group by bookingStatus and sum occurrences
    {
      $group: {
        _id: "$bookingStatus",
        count: { $sum: 1 }
      }
    }
  ]);

  // Default response values
  const data = {
    totalBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0
  };

  // Compile aggregation outcomes
  stats.forEach((item) => {
    data.totalBookings += item.count;
    if (item._id === "completed") data.completedBookings = item.count;
    else if (item._id === "cancelled") data.cancelledBookings = item.count;
    else if (item._id === "pending") data.pendingBookings = item.count;
    else if (item._id === "confirmed") data.confirmedBookings = item.count;
  });

  return res.status(200).json({
    success: true,
    data
  });
});

/**
 * Calculate the success/completion rate of bookings.
 * GET /api/v1/analytics/success-rate
 */
const getSuccessRate = asyncHandler(async (req, res) => {
  const stats = await Booking.aggregate([
    // 1. Exclude soft-deleted records
    { $match: { isDeleted: false } },
    // 2. Accumulate total and completed rides concurrently
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        completed: {
          $sum: { $cond: [{ $eq: ["$bookingStatus", "completed"] }, 1, 0] }
        }
      }
    }
  ]);

  const result = stats[0] || { total: 0, completed: 0 };
  const successRate =
    result.total > 0
      ? parseFloat(((result.completed / result.total) * 100).toFixed(2))
      : 0;

  return res.status(200).json({
    success: true,
    successRate
  });
});

/**
 * Identify most booked vehicle types.
 * GET /api/v1/analytics/top-vehicles
 */
const getTopVehicles = asyncHandler(async (req, res) => {
  const data = await Booking.aggregate([
    // 1. Exclude soft-deleted records
    { $match: { isDeleted: false } },
    // 2. Group bookings by vehicleType
    {
      $group: {
        _id: "$vehicleType",
        totalBookings: { $sum: 1 }
      }
    },
    // 3. Sort bookings descending
    { $sort: { totalBookings: -1 } },
    // 4. Project key fields
    {
      $project: {
        _id: 0,
        vehicleType: "$_id",
        totalBookings: 1
      }
    }
  ]);

  // Clean casing presentation for frontend outputs
  const formattedData = data.map((item) => {
    let type = item.vehicleType;
    if (type === "suv") {
      type = "SUV";
    } else if (type) {
      type = type.charAt(0).toUpperCase() + type.slice(1);
    }
    return {
      vehicleType: type,
      totalBookings: item.totalBookings
    };
  });

  return res.status(200).json({
    success: true,
    data: formattedData
  });
});

/**
 * Return bookings with the highest fares.
 * GET /api/v1/analytics/highest-fare
 */
const getHighestFareBookings = asyncHandler(async (req, res) => {
  const data = await Booking.aggregate([
    // 1. Exclude soft-deleted records
    { $match: { isDeleted: false } },
    // 2. Sort by fare descending
    { $sort: { fare: -1 } },
    // 3. Limit result count to 10
    { $limit: 10 }
  ]);

  return res.status(200).json({
    success: true,
    data
  });
});

/**
 * Compile monthly ride trends.
 * GET /api/v1/analytics/monthly-rides
 */
const getMonthlyRideStats = asyncHandler(async (req, res) => {
  const data = await Booking.aggregate([
    // 1. Exclude soft-deleted records
    { $match: { isDeleted: false } },
    // 2. Extract month from bookingDate and group bookings
    {
      $group: {
        _id: { $month: "$bookingDate" },
        totalBookings: { $sum: 1 }
      }
    },
    // 3. Sort chronologically
    { $sort: { _id: 1 } },
    // 4. Clean projection output
    {
      $project: {
        _id: 0,
        month: "$_id",
        totalBookings: 1
      }
    }
  ]);

  return res.status(200).json({
    success: true,
    data
  });
});

module.exports = {
  getBookingStats,
  getSuccessRate,
  getTopVehicles,
  getHighestFareBookings,
  getMonthlyRideStats
};
