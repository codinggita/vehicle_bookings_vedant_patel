const mongoose = require("mongoose");
const Booking = require("../models/booking.model");
const {
  toNumber,
  toDate,
  sanitizeString
} = require("../utils/dataCleaner");
const { getPaginationConfig } = require("../utils/pagination");

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

/**
 * Retrieve all active bookings with pagination support.
 * GET /api/v1/bookings
 */
const getAllBookings = async (req, res) => {
  try {
    // 1. Process query parameters using pagination helper
    const { page, limit, skip } = getPaginationConfig(req.query);

    // 2. Query configurations (only fetch records where isDeleted is false)
    const query = { isDeleted: false };

    // 3. Run queries in parallel for optimal database performance
    const [totalBookings, bookings] = await Promise.all([
      Booking.countDocuments(query),
      Booking.find(query)
        .skip(skip)
        .limit(limit)
    ]);

    // 4. Return standard-compliant paginated response
    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      pagination: {
        total: totalBookings,
        page,
        limit,
        totalPages: Math.ceil(totalBookings / limit)
      },
      data: bookings
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during fetching bookings"
    });
  }
};

/**
 * Retrieve a single booking by ID.
 * GET /api/v1/bookings/:id
 */
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate MongoDB ObjectId format to prevent database query crashes
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format"
      });
    }

    // 2. Query MongoDB, excluding soft-deleted records
    const booking = await Booking.findOne({ _id: id, isDeleted: false });

    // 3. Return 404 if document does not exist
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // 4. Return successful response with clean structure
    return res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: booking
    });
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during fetching booking"
    });
  }
};

/**
 * Update a booking fully.
 * PUT /api/v1/bookings/:id
 */
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format"
      });
    }

    // 2. Validate request body is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body cannot be empty"
      });
    }

    // 3. Soft Delete Awareness: Verify booking exists and is not deleted
    const existingBooking = await Booking.findOne({ _id: id, isDeleted: false });
    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // 4. Sanitize and normalize input fields if provided
    const updateData = {};
    const allowedFields = [
      "customerName",
      "customerPhone",
      "vehicleType",
      "pickupLocation",
      "dropLocation",
      "distance",
      "fare",
      "bookingStatus",
      "paymentMethod",
      "paymentStatus",
      "rating",
      "bookingDate",
      "rideStartTime",
      "rideEndTime"
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        if (field === "distance") {
          const dist = toNumber(req.body.distance);
          if (dist === null || dist < 0) {
            return res.status(400).json({ success: false, message: "Distance must be a valid non-negative number" });
          }
          updateData.distance = dist;
        } else if (field === "fare") {
          const f = toNumber(req.body.fare);
          if (f === null || f < 0) {
            return res.status(400).json({ success: false, message: "Fare must be a valid non-negative number" });
          }
          updateData.fare = f;
        } else if (field === "rating") {
          if (req.body.rating === null || req.body.rating === "") {
            updateData.rating = null;
          } else {
            const r = toNumber(req.body.rating);
            if (r === null || r < 1 || r > 5) {
              return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
            }
            updateData.rating = r;
          }
        } else if (["vehicleType", "bookingStatus", "paymentMethod", "paymentStatus"].includes(field)) {
          updateData[field] = sanitizeString(req.body[field], true); // Force lowercase
        } else if (["bookingDate", "rideStartTime", "rideEndTime"].includes(field)) {
          updateData[field] = req.body[field] ? toDate(req.body[field]) : null;
        } else {
          updateData[field] = sanitizeString(req.body[field]);
        }
      }
    }

    // 5. Update and return new document using findByIdAndUpdate with Mongoose schema validation enabled
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking
    });

  } catch (error) {
    console.error("Error updating booking:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error during booking update"
    });
  }
};

/**
 * Update only booking status.
 * PATCH /api/v1/bookings/:id/status
 */
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookingStatus } = req.body;

    // 1. Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format"
      });
    }

    // 2. Validate request body status presence
    if (!bookingStatus || String(bookingStatus).trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Booking status is required"
      });
    }

    // 3. Validate bookingStatus enum values
    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];
    const sanitizedStatus = sanitizeString(bookingStatus, true);

    if (!allowedStatuses.includes(sanitizedStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status"
      });
    }

    // 4. Soft Delete Awareness: Verify booking exists and is not deleted
    const existingBooking = await Booking.findOne({ _id: id, isDeleted: false });
    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // 5. Update only the status field
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { bookingStatus: sanitizedStatus },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: updatedBooking
    });

  } catch (error) {
    console.error("Error updating booking status:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error during booking status update"
    });
  }
};

/**
 * Hard delete a booking permanently from database.
 * DELETE /api/v1/bookings/:id
 */
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format"
      });
    }

    // 2. Perform permanent database deletion
    const deletedBooking = await Booking.findByIdAndDelete(id);

    // 3. Return 404 if booking not found
    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // 4. Return success response
    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully"
    });

  } catch (error) {
    console.error("Error during hard delete:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during booking deletion"
    });
  }
};

/**
 * Soft delete a booking (mark isDeleted = true).
 * PATCH /api/v1/bookings/:id/soft-delete
 */
const softDeleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format"
      });
    }

    // 2. Find booking to check state and existence
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // 3. Prevent double soft delete (return 409 Conflict)
    if (booking.isDeleted) {
      return res.status(409).json({
        success: false,
        message: "Booking already deleted"
      });
    }

    // 4. Perform soft deletion (set isDeleted = true)
    booking.isDeleted = true;
    await booking.save();

    // 5. Return success response
    return res.status(200).json({
      success: true,
      message: "Booking soft deleted successfully"
    });

  } catch (error) {
    console.error("Error during soft delete:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during soft deletion"
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  softDeleteBooking
};
