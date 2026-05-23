const Booking = require("../models/booking.model");
const {
  toNumber,
  toDate,
  sanitizeString
} = require("../utils/dataCleaner");

/**
 * Create a new vehicle booking.
 * POST /api/v1/bookings
 */
const createBooking = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      vehicleType,
      pickupLocation,
      dropLocation,
      distance,
      fare,
      bookingStatus,
      paymentMethod,
      paymentStatus,
      rating,
      bookingDate,
      rideStartTime,
      rideEndTime
    } = req.body;

    // 1. Basic validation of required request body fields
    if (!customerName || String(customerName).trim() === "") {
      return res.status(400).json({ success: false, message: "Customer name is required" });
    }
    if (!vehicleType || String(vehicleType).trim() === "") {
      return res.status(400).json({ success: false, message: "Vehicle type is required" });
    }
    if (!pickupLocation || String(pickupLocation).trim() === "") {
      return res.status(400).json({ success: false, message: "Pickup location is required" });
    }
    if (!dropLocation || String(dropLocation).trim() === "") {
      return res.status(400).json({ success: false, message: "Drop location is required" });
    }
    if (distance === undefined || distance === null) {
      return res.status(400).json({ success: false, message: "Distance is required" });
    }
    if (fare === undefined || fare === null) {
      return res.status(400).json({ success: false, message: "Fare is required" });
    }
    if (!paymentMethod || String(paymentMethod).trim() === "") {
      return res.status(400).json({ success: false, message: "Payment method is required" });
    }

    // 2. Normalize and clean the input using our utilities to guarantee type consistency
    const cleanedCustomerName = sanitizeString(customerName);
    const cleanedVehicleType = sanitizeString(vehicleType, true); // Enforce lowercase
    const cleanedPickupLocation = sanitizeString(pickupLocation);
    const cleanedDropLocation = sanitizeString(dropLocation);
    const parsedDistance = toNumber(distance);
    const parsedFare = toNumber(fare);
    const cleanedPaymentMethod = sanitizeString(paymentMethod, true); // Enforce lowercase

    // Validation checks on parsed numbers
    if (parsedDistance === null || parsedDistance < 0) {
      return res.status(400).json({ success: false, message: "Distance must be a valid non-negative number" });
    }
    if (parsedFare === null || parsedFare < 0) {
      return res.status(400).json({ success: false, message: "Fare must be a valid non-negative number" });
    }

    // 3. Assemble and sanitize optional fields
    const cleanedCustomerPhone = sanitizeString(customerPhone);
    const cleanedBookingStatus = sanitizeString(bookingStatus, true) || "pending";
    const cleanedPaymentStatus = sanitizeString(paymentStatus, true) || "pending";
    const parsedRating = rating !== undefined ? toNumber(rating) : null;
    const parsedBookingDate = bookingDate ? toDate(bookingDate) : new Date();
    const parsedRideStartTime = rideStartTime ? toDate(rideStartTime) : null;
    const parsedRideEndTime = rideEndTime ? toDate(rideEndTime) : null;

    // Additional range checks for optional fields
    if (parsedRating !== null && (parsedRating < 1 || parsedRating > 5)) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }

    // 4. Create and save document in MongoDB using Mongoose schema
    const newBooking = new Booking({
      customerName: cleanedCustomerName,
      customerPhone: cleanedCustomerPhone,
      vehicleType: cleanedVehicleType,
      pickupLocation: cleanedPickupLocation,
      dropLocation: cleanedDropLocation,
      distance: parsedDistance,
      fare: parsedFare,
      bookingStatus: cleanedBookingStatus,
      paymentMethod: cleanedPaymentMethod,
      paymentStatus: cleanedPaymentStatus,
      rating: parsedRating,
      bookingDate: parsedBookingDate,
      rideStartTime: parsedRideStartTime,
      rideEndTime: parsedRideEndTime,
      isDeleted: false
    });

    const savedBooking = await newBooking.save();

    // 5. Return professional API response
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: savedBooking
    });

  } catch (error) {
    console.error("Error creating booking:", error);
    
    // Catch Mongoose schema validation errors specifically
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error during booking creation"
    });
  }
};

module.exports = {
  createBooking
};
