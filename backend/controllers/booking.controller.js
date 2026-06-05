const mongoose = require("mongoose");
const Booking = require("../models/booking.model");

// === INLINED UTILITIES ===

const toNull = (val) => {
  if (val === undefined || val === null) return null;
  const str = String(val).trim().toLowerCase();
  if (str === "" || str === "null" || str === "undefined" || str === "n/a" || str === "#name?") {
    return null;
  }
  return val;
};

const toNumber = (val, fallback = null) => {
  const cleanedVal = toNull(val);
  if (cleanedVal === null) return fallback;
  const numStr = String(cleanedVal).replace(/[^0-9.-]/g, "");
  const parsed = parseFloat(numStr);
  return isNaN(parsed) ? fallback : parsed;
};

const toDate = (val, fallback = null) => {
  const cleanedVal = toNull(val);
  if (cleanedVal === null) return fallback;
  const parsedDate = new Date(cleanedVal);
  return isNaN(parsedDate.getTime()) ? fallback : parsedDate;
};

const sanitizeString = (val, normalizeCasing = false) => {
  const cleanedVal = toNull(val);
  if (cleanedVal === null) return null;
  const trimmed = String(cleanedVal).trim();
  return normalizeCasing ? trimmed.toLowerCase() : trimmed;
};

const getPaginationConfig = (query = {}, options = {}) => {
  let page = parseInt(query.page, 10);
  let limit = parseInt(query.limit, 10);

  const defaultPage = options.defaultPage || 1;
  const defaultLimit = options.defaultLimit || 10;
  const maxLimit = options.maxLimit || 100;

  if (isNaN(page) || page <= 0) page = defaultPage;
  if (isNaN(limit) || limit <= 0) limit = defaultLimit;
  if (limit > maxLimit) limit = maxLimit;

  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const getFilterConfig = (query = {}) => {
  const filter = {};

  if (query.status !== undefined && query.status !== "") {
    const sanitizedStatus = sanitizeString(query.status, true);
    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (sanitizedStatus && allowedStatuses.includes(sanitizedStatus)) {
      filter.bookingStatus = sanitizedStatus;
    }
  }

  if (query.paymentStatus !== undefined && query.paymentStatus !== "") {
    const sanitizedPayment = sanitizeString(query.paymentStatus, true);
    const allowedPayments = ["pending", "paid", "failed", "refunded"];
    if (sanitizedPayment && allowedPayments.includes(sanitizedPayment)) {
      filter.paymentStatus = sanitizedPayment;
    }
  }

  if (query.vehicleType !== undefined && query.vehicleType !== "") {
    const sanitizedVehicle = sanitizeString(query.vehicleType, true);
    const allowedVehicles = ["sedan", "suv", "hatchback", "luxury"];
    if (sanitizedVehicle && allowedVehicles.includes(sanitizedVehicle)) {
      filter.vehicleType = sanitizedVehicle;
    }
  }

  if (query.rating !== undefined && query.rating !== "") {
    const parsedRating = toNumber(query.rating);
    if (parsedRating !== null && parsedRating >= 1 && parsedRating <= 5) {
      filter.rating = parsedRating;
    }
  }

  if ((query.minFare !== undefined && query.minFare !== "") || (query.maxFare !== undefined && query.maxFare !== "")) {
    const fareQuery = {};
    if (query.minFare !== undefined && query.minFare !== "") {
      const minFare = toNumber(query.minFare);
      if (minFare !== null && minFare >= 0) fareQuery.$gte = minFare;
    }
    if (query.maxFare !== undefined && query.maxFare !== "") {
      const maxFare = toNumber(query.maxFare);
      if (maxFare !== null && maxFare >= 0) fareQuery.$lte = maxFare;
    }
    if (Object.keys(fareQuery).length > 0) filter.fare = fareQuery;
  }

  if ((query.minDistance !== undefined && query.minDistance !== "") || (query.maxDistance !== undefined && query.maxDistance !== "")) {
    const distanceQuery = {};
    if (query.minDistance !== undefined && query.minDistance !== "") {
      const minDistance = toNumber(query.minDistance);
      if (minDistance !== null && minDistance >= 0) distanceQuery.$gte = minDistance;
    }
    if (query.maxDistance !== undefined && query.maxDistance !== "") {
      const maxDistance = toNumber(query.maxDistance);
      if (maxDistance !== null && maxDistance >= 0) distanceQuery.$lte = maxDistance;
    }
    if (Object.keys(distanceQuery).length > 0) filter.distance = distanceQuery;
  }

  return filter;
};

const getSortConfig = (query = {}) => {
  const sortBy = query.sortBy || "createdAt";
  const order = query.order || "desc";

  const allowedSortFields = [
    "customerName",
    "vehicleType",
    "distance",
    "fare",
    "bookingStatus",
    "paymentStatus",
    "rating",
    "bookingDate",
    "createdAt"
  ];

  const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
  const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

  return { [sortField]: sortOrder };
};

const getSearchConfig = (query = {}) => {
  if (!query.search || String(query.search).trim() === "") {
    return {};
  }

  const escapeRegex = (string) => string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const escapedSearch = escapeRegex(String(query.search).trim());
  const searchRegex = { $regex: escapedSearch, $options: "i" };

  return {
    $or: [
      { customerName: searchRegex },
      { vehicleType: searchRegex },
      { pickupLocation: searchRegex },
      { dropLocation: searchRegex },
      { customerPhone: searchRegex },
      { paymentMethod: searchRegex },
      { bookingStatus: searchRegex }
    ]
  };
};

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
      userId: req.user ? req.user._id : (req.body.userId || null),
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

    // 2. Extract dynamic filters, search queries, and sorting options from query parameters
    const filter = getFilterConfig(req.query);
    const search = getSearchConfig(req.query);
    const sort = getSortConfig(req.query);

    // 3. Combined query configuration (always including soft delete awareness)
    const query = { ...filter, ...search, isDeleted: false };

    // Restrict regular users to their own bookings
    if (req.user && req.user.role !== "admin") {
      query.userId = req.user._id;
    }

    // 4. Run queries in parallel for optimal database performance (using .lean() for read-only optimization)
    const [totalBookings, bookings] = await Promise.all([
      Booking.countDocuments(query),
      Booking.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
    ]);

    // 5. Return standard-compliant paginated response
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

    // 2. Query MongoDB, excluding soft-deleted records (using .lean() for read-only optimization)
    const query = { _id: id, isDeleted: false };
    if (req.user && req.user.role !== "admin") {
      query.userId = req.user._id;
    }
    const booking = await Booking.findOne(query).lean();

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
    const query = { _id: id, isDeleted: false };
    if (req.user && req.user.role !== "admin") {
      query.userId = req.user._id;
    }
    const existingBooking = await Booking.findOne(query);
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
    const query = { _id: id, isDeleted: false };
    if (req.user && req.user.role !== "admin") {
      query.userId = req.user._id;
    }
    const existingBooking = await Booking.findOne(query);
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
    const query = { _id: id };
    if (req.user && req.user.role !== "admin") {
      query.userId = req.user._id;
    }
    const deletedBooking = await Booking.findOneAndDelete(query);

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
    const query = { _id: id };
    if (req.user && req.user.role !== "admin") {
      query.userId = req.user._id;
    }
    const booking = await Booking.findOne(query);
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

/**
 * Retrieve bookings matching a specific status.
 * GET /api/v1/bookings/status/:status
 */
const getBookingsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    // 1. Sanitize and validate booking status
    const sanitizedStatus = sanitizeString(status, true);
    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];

    if (!sanitizedStatus || !allowedStatuses.includes(sanitizedStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status"
      });
    }

    // 2. Query MongoDB, excluding soft deleted records (using .lean() for read-only optimization)
    const query = { bookingStatus: sanitizedStatus, isDeleted: false };
    if (req.user && req.user.role !== "admin") {
      query.userId = req.user._id;
    }
    const bookings = await Booking.find(query).lean();

    // 3. Return RESTful response
    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error("Error fetching bookings by status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during fetching bookings by status"
    });
  }
};

/**
 * Retrieve bookings matching a specific vehicle type.
 * GET /api/v1/bookings/vehicle/:vehicleType
 */
const getBookingsByVehicleType = async (req, res) => {
  try {
    const { vehicleType } = req.params;

    // 1. Sanitize and validate vehicle type
    const sanitizedVehicle = sanitizeString(vehicleType, true);
    const allowedVehicles = ["sedan", "suv", "hatchback", "luxury"];

    if (!sanitizedVehicle || !allowedVehicles.includes(sanitizedVehicle)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle type"
      });
    }

    // 2. Query MongoDB, excluding soft deleted records (using .lean() for read-only optimization)
    const query = { vehicleType: sanitizedVehicle, isDeleted: false };
    if (req.user && req.user.role !== "admin") {
      query.userId = req.user._id;
    }
    const bookings = await Booking.find(query).lean();

    // 3. Return RESTful response
    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error("Error fetching bookings by vehicle type:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during fetching bookings by vehicle type"
    });
  }
};

/**
 * Retrieve bookings matching a customer name.
 * Supports partial and case-insensitive regex matches.
 * GET /api/v1/bookings/customer/:customerName
 */
const getBookingsByCustomer = async (req, res) => {
  try {
    const { customerName } = req.params;

    if (!customerName || String(customerName).trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Customer name parameter is required"
      });
    }

    const sanitizedCustomer = sanitizeString(customerName);
    
    // Safety helper: Escape regex special characters to prevent injection
    const escapeRegex = (string) => string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const escapedCustomer = escapeRegex(sanitizedCustomer);

    // Query MongoDB with case-insensitive partial match (using .lean() for read-only optimization)
    const query = {
      customerName: { $regex: escapedCustomer, $options: "i" },
      isDeleted: false
    };
    if (req.user && req.user.role !== "admin") {
      query.userId = req.user._id;
    }
    const bookings = await Booking.find(query).lean();

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error("Error fetching bookings by customer:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during fetching bookings by customer"
    });
  }
};

/**
 * Retrieve bookings matching a payment method.
 * GET /api/v1/bookings/payment/:paymentMethod
 */
const getBookingsByPaymentMethod = async (req, res) => {
  try {
    const { paymentMethod } = req.params;

    // Normalize input to lowercase to support case-insensitive parameter input
    const sanitizedMethod = sanitizeString(paymentMethod, true);
    const allowedMethods = ["cash", "card", "upi", "net_banking"];

    if (!sanitizedMethod || !allowedMethods.includes(sanitizedMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method"
      });
    }

    // Query MongoDB, excluding soft deleted records (using .lean() for read-only optimization)
    const query = { paymentMethod: sanitizedMethod, isDeleted: false };
    if (req.user && req.user.role !== "admin") {
      query.userId = req.user._id;
    }
    const bookings = await Booking.find(query).lean();

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error("Error fetching bookings by payment method:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during fetching bookings by payment method"
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
  softDeleteBooking,
  getBookingsByStatus,
  getBookingsByVehicleType,
  getBookingsByCustomer,
  getBookingsByPaymentMethod
};
