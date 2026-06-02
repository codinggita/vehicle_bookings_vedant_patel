const mongoose = require("mongoose");
const Booking = require("../models/booking.model");

/**
 * Service class handling all database operations and business logic for Bookings.
 * Decouples database concerns from Express controllers.
 */
class BookingService {
  /**
   * Create a new booking in the database.
   * @param {Object} bookingData - Cleaned booking payload.
   * @returns {Promise<Object>} Created Mongoose document.
   */
  async createBooking(bookingData) {
    const newBooking = new Booking(bookingData);
    return await newBooking.save();
  }

  /**
   * Fetch all bookings matching filter and query parameters.
   * @param {Object} params - Query filters, search parameters, pagination, and sorting.
   * @returns {Promise<Object>} Object containing total count and bookings data.
   */
  async getAllBookings({ filter, search, sort, skip, limit }) {
    const query = { ...filter, ...search, isDeleted: false };
    const [totalBookings, bookings] = await Promise.all([
      Booking.countDocuments(query),
      Booking.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
    ]);
    return { totalBookings, bookings };
  }

  /**
   * Find a booking by its primary key ID.
   * @param {string} id - The booking ObjectId.
   * @returns {Promise<Object|null>} Found booking plain object or null.
   */
  async getBookingById(id) {
    return await Booking.findOne({ _id: id, isDeleted: false }).lean();
  }

  /**
   * Update a booking fully.
   * @param {string} id - The booking ObjectId.
   * @param {Object} updateData - Key-value payload to update.
   * @returns {Promise<Object|null>} Updated Mongoose document.
   */
  async updateBooking(id, updateData) {
    return await Booking.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  }

  /**
   * Update a booking's status.
   * @param {string} id - The booking ObjectId.
   * @param {string} status - New status code.
   * @returns {Promise<Object|null>} Updated Mongoose document.
   */
  async updateBookingStatus(id, status) {
    return await Booking.findByIdAndUpdate(
      id,
      { bookingStatus: status },
      { new: true, runValidators: true }
    );
  }

  /**
   * Hard delete a booking permanently.
   * @param {string} id - The booking ObjectId.
   * @returns {Promise<Object|null>} Deleted booking document.
   */
  async deleteBooking(id) {
    return await Booking.findByIdAndDelete(id);
  }

  /**
   * Soft delete a booking by checking existence and setting isDeleted to true.
   * @param {string} id - The booking ObjectId.
   * @returns {Promise<Object>} Updated/soft-deleted booking document.
   * @throws {Error} If booking is not found or already soft deleted.
   */
  async softDeleteBooking(id) {
    const booking = await Booking.findById(id);
    if (!booking) {
      const err = new Error("Booking not found");
      err.statusCode = 404;
      throw err;
    }
    if (booking.isDeleted) {
      const err = new Error("Booking already deleted");
      err.statusCode = 409;
      throw err;
    }
    booking.isDeleted = true;
    return await booking.save();
  }

  /**
   * Fetch bookings matching a specific status.
   * @param {string} status - Normalized status string.
   * @returns {Promise<Array>} List of bookings.
   */
  async getBookingsByStatus(status) {
    return await Booking.find({ bookingStatus: status, isDeleted: false }).lean();
  }

  /**
   * Fetch bookings matching a specific vehicle type.
   * @param {string} vehicleType - Normalized vehicle type string.
   * @returns {Promise<Array>} List of bookings.
   */
  async getBookingsByVehicleType(vehicleType) {
    return await Booking.find({ vehicleType, isDeleted: false }).lean();
  }

  /**
   * Fetch bookings matching a customer name with partial regex support.
   * @param {string} escapedCustomerName - Escaped regex customer name string.
   * @returns {Promise<Array>} List of bookings.
   */
  async getBookingsByCustomer(escapedCustomerName) {
    return await Booking.find({
      customerName: { $regex: escapedCustomerName, $options: "i" },
      isDeleted: false
    }).lean();
  }

  /**
   * Fetch bookings matching a payment method.
   * @param {string} paymentMethod - Normalized payment method string.
   * @returns {Promise<Array>} List of bookings.
   */
  async getBookingsByPaymentMethod(paymentMethod) {
    return await Booking.find({ paymentMethod, isDeleted: false }).lean();
  }
}

module.exports = new BookingService();
