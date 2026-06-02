const AnalyticsService = require("../services/analytics.service");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Get overall booking statistics grouped by status.
 * GET /api/v1/analytics/booking-stats
 */
const getBookingStats = asyncHandler(async (req, res) => {
  const stats = await AnalyticsService.getBookingStats();

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
  const stats = await AnalyticsService.getSuccessRate();

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
  const data = await AnalyticsService.getTopVehicles();

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
  const data = await AnalyticsService.getHighestFareBookings();

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
  const data = await AnalyticsService.getMonthlyRideStats();

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
