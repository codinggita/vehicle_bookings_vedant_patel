const User = require("../models/user.model");
const Booking = require("../models/booking.model");

/**
 * Service class handling all database management actions for Admin users.
 * Decouples database queries from administrator controllers.
 */
class AdminService {
  /**
   * Fetch platform metrics counts in parallel.
   * @returns {Promise<Object>} Platform metrics numbers.
   */
  async getDashboardStats() {
    const [
      totalUsers,
      activeUsers,
      totalBookings,
      completedBookings,
      cancelledBookings
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Booking.countDocuments({ isDeleted: false }),
      Booking.countDocuments({ bookingStatus: "completed", isDeleted: false }),
      Booking.countDocuments({ bookingStatus: "cancelled", isDeleted: false })
    ]);
    return {
      totalUsers,
      activeUsers,
      totalBookings,
      completedBookings,
      cancelledBookings
    };
  }

  /**
   * Fetch all registered users in database.
   * @returns {Promise<Array>} List of users.
   */
  async getAllUsers() {
    return await User.find().lean();
  }

  /**
   * Fetch details of a single user by ID.
   * @param {string} id - The user ObjectId.
   * @returns {Promise<Object|null>} Found user plain object or null.
   */
  async getSingleUser(id) {
    return await User.findById(id).lean();
  }

  /**
   * Update the role parameter of a user.
   * @param {string} id - The user ObjectId.
   * @param {string} role - The new role enum string.
   * @returns {Promise<Object|null>} Updated User document.
   */
  async updateUserRole(id, role) {
    return await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );
  }

  /**
   * Enable or disable a user account.
   * @param {string} id - The user ObjectId.
   * @param {boolean} isActive - New active state flag.
   * @returns {Promise<Object|null>} Updated User document.
   */
  async disableUser(id, isActive) {
    return await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true }
    );
  }
}

module.exports = new AdminService();
