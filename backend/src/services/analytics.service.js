const Booking = require("../models/booking.model");

/**
 * Service class handling all MongoDB aggregation logic for Analytics.
 * Decouples database queries from analytics controllers.
 */
class AnalyticsService {
  /**
   * Aggregate bookings by status.
   * @returns {Promise<Array>} Aggregation results.
   */
  async getBookingStats() {
    return await Booking.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$bookingStatus",
          count: { $sum: 1 }
        }
      }
    ]);
  }

  /**
   * Aggregate booking success rates.
   * @returns {Promise<Array>} Aggregation results.
   */
  async getSuccessRate() {
    return await Booking.aggregate([
      { $match: { isDeleted: false } },
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
  }

  /**
   * Aggregate and identify top vehicle types.
   * @returns {Promise<Array>} Aggregation results.
   */
  async getTopVehicles() {
    return await Booking.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$vehicleType",
          totalBookings: { $sum: 1 }
        }
      },
      { $sort: { totalBookings: -1 } },
      {
        $project: {
          _id: 0,
          vehicleType: "$_id",
          totalBookings: 1
        }
      }
    ]);
  }

  /**
   * Get highest fare bookings.
   * @returns {Promise<Array>} Aggregation results.
   */
  async getHighestFareBookings() {
    return await Booking.aggregate([
      { $match: { isDeleted: false } },
      { $sort: { fare: -1 } },
      { $limit: 10 }
    ]);
  }

  /**
   * Aggregate monthly ride stats.
   * @returns {Promise<Array>} Aggregation results.
   */
  async getMonthlyRideStats() {
    return await Booking.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: { $month: "$bookingDate" },
          totalBookings: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          month: "$_id",
          totalBookings: 1
        }
      }
    ]);
  }
}

module.exports = new AnalyticsService();
