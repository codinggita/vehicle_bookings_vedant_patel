const mongoose = require("mongoose");
const Booking = require("../models/booking.model");

// Helper wrapper for async endpoints
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

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

// User boundary helper
const applyUserScope = (req, query) => {
  if (req.user && req.user.role !== "admin") {
    query.userId = req.user._id;
  }
  return query;
};

// === CORE CRUD CONTROLLERS ===

const createBooking = asyncHandler(async (req, res) => {
  const {
    bookingId,
    customerId,
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
    driverRating,
    customerRating,
    vTat,
    cTat,
    cancelledByCustomerReason,
    cancelledByDriverReason,
    isIncomplete,
    incompleteReason,
    bookingDate,
    rideStartTime,
    rideEndTime
  } = req.body;

  const newBooking = new Booking({
    userId: req.user ? req.user._id : null,
    bookingId: sanitizeString(bookingId),
    customerId: sanitizeString(customerId),
    customerName: sanitizeString(customerName),
    customerPhone: sanitizeString(customerPhone),
    vehicleType: sanitizeString(vehicleType) || "sedan",
    pickupLocation: sanitizeString(pickupLocation) || "unknown",
    dropLocation: sanitizeString(dropLocation) || "unknown",
    distance: toNumber(distance, 0),
    fare: toNumber(fare, 0),
    bookingStatus: sanitizeString(bookingStatus) || "pending",
    paymentMethod: sanitizeString(paymentMethod),
    paymentStatus: sanitizeString(paymentStatus) || "pending",
    rating: toNumber(rating),
    driverRating: toNumber(driverRating),
    customerRating: toNumber(customerRating),
    vTat: toNumber(vTat),
    cTat: toNumber(cTat),
    cancelledByCustomerReason: sanitizeString(cancelledByCustomerReason),
    cancelledByDriverReason: sanitizeString(cancelledByDriverReason),
    isIncomplete: sanitizeString(isIncomplete),
    incompleteReason: sanitizeString(incompleteReason),
    bookingDate: bookingDate ? toDate(bookingDate) : new Date(),
    rideStartTime: rideStartTime ? toDate(rideStartTime) : null,
    rideEndTime: rideEndTime ? toDate(rideEndTime) : null,
    isDeleted: false
  });

  const saved = await newBooking.save();
  return res.status(201).json({ success: true, message: "Booking created successfully", data: saved });
});

const getAllBookings = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Build filter query dynamically
  const filter = { isDeleted: false };
  applyUserScope(req, filter);

  if (req.query.status) filter.bookingStatus = req.query.status;
  if (req.query.vehicle) filter.vehicleType = req.query.vehicle;
  if (req.query.payment) filter.paymentMethod = req.query.payment;
  if (req.query.pickup) filter.pickupLocation = { $regex: escapeRegex(req.query.pickup), $options: "i" };
  if (req.query.drop) filter.dropLocation = { $regex: escapeRegex(req.query.drop), $options: "i" };
  if (req.query.date) {
    const start = new Date(req.query.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(req.query.date);
    end.setHours(23, 59, 59, 999);
    filter.bookingDate = { $gte: start, $lte: end };
  }
  if (req.query.driverRating) filter.driverRating = parseFloat(req.query.driverRating);
  if (req.query.customerRating) filter.customerRating = parseFloat(req.query.customerRating);
  if (req.query.customer) filter.customerId = req.query.customer;
  if (req.query.incomplete) filter.isIncomplete = req.query.incomplete;

  // Range filters
  if (req.query.minFare || req.query.maxFare) {
    filter.fare = {};
    if (req.query.minFare) filter.fare.$gte = parseFloat(req.query.minFare);
    if (req.query.maxFare) filter.fare.$lte = parseFloat(req.query.maxFare);
  }
  if (req.query.minDistance || req.query.maxDistance) {
    filter.distance = {};
    if (req.query.minDistance) filter.distance.$gte = parseFloat(req.query.minDistance);
    if (req.query.maxDistance) filter.distance.$lte = parseFloat(req.query.maxDistance);
  }
  if (req.query.minRating || req.query.maxRating) {
    filter.customerRating = {};
    if (req.query.minRating) filter.customerRating.$gte = parseFloat(req.query.minRating);
    if (req.query.maxRating) filter.customerRating.$lte = parseFloat(req.query.maxRating);
  }

  // Boolean/Flag filters
  if (req.query.cancelledByDriver === "true") {
    filter.cancelledByDriverReason = { $ne: null };
  }
  if (req.query.cancelledByCustomer === "true") {
    filter.cancelledByCustomerReason = { $ne: null };
  }
  if (req.query.distanceAbove) {
    filter.distance = { $gt: parseFloat(req.query.distanceAbove) };
  }
  if (req.query.distanceBelow) {
    filter.distance = { $lt: parseFloat(req.query.distanceBelow) };
  }

  // Aggregate operators with expressions
  if (req.query.month) {
    filter.$expr = { $eq: [{ $month: "$bookingDate" }, parseInt(req.query.month, 10)] };
  }
  if (req.query.year) {
    filter.$expr = { $eq: [{ $year: "$bookingDate" }, parseInt(req.query.year, 10)] };
  }
  if (req.query.hour) {
    filter.$expr = { $eq: [{ $hour: "$bookingDate" }, parseInt(req.query.hour, 10)] };
  }

  // Support search keyword parameter
  if (req.query.search) {
    const cleanSearch = escapeRegex(String(req.query.search).trim());
    const searchRegex = { $regex: cleanSearch, $options: "i" };
    filter.$or = [
      { customerName: searchRegex },
      { bookingId: searchRegex },
      { vehicleType: searchRegex }
    ];
  }

  // Sorting parser
  let sortConfig = { bookingDate: -1 }; // default
  if (req.query.sortBy) {
    const fieldMapping = {
      fare: "fare",
      distance: "distance",
      driverRating: "driverRating",
      customerRating: "customerRating",
      bookingDate: "bookingDate",
      vehicleType: "vehicleType",
      paymentMethod: "paymentMethod",
      createdAt: "createdAt"
    };
    const mappedField = fieldMapping[req.query.sortBy] || req.query.sortBy;
    const order = req.query.order === "asc" ? 1 : -1;
    sortConfig = { [mappedField]: order };
  } else if (req.query.sort) {
    const rawSort = req.query.sort;
    const isDesc = rawSort.startsWith("-");
    const cleanSortField = isDesc ? rawSort.slice(1) : rawSort;
    const order = isDesc ? -1 : 1;

    // Whitelist mapping
    const fieldMapping = {
      Booking_Value: "fare",
      Ride_Distance: "distance",
      Driver_Ratings: "driverRating",
      Customer_Rating: "customerRating",
      Date: "bookingDate",
      Vehicle_Type: "vehicleType",
      Payment_Method: "paymentMethod",
      Pickup_Location: "pickupLocation",
      Drop_Location: "dropLocation",
      Booking_Status: "bookingStatus"
    };

    const mappedField = fieldMapping[cleanSortField] || cleanSortField;
    sortConfig = { [mappedField]: order };
  }

  const [total, data] = await Promise.all([
    Booking.countDocuments(filter),
    Booking.find(filter).sort(sortConfig).skip(skip).limit(limit).lean()
  ]);

  return res.status(200).json({
    success: true,
    pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    data
  });
});

const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const filter = { _id: id, isDeleted: false };
  applyUserScope(req, filter);

  const booking = await Booking.findOne(filter).lean();
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

  return res.status(200).json({ success: true, data: booking });
});

const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const filter = { _id: id, isDeleted: false };
  applyUserScope(req, filter);

  const updated = await Booking.findOneAndUpdate(filter, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ success: false, message: "Booking not found" });

  return res.status(200).json({ success: true, message: "Booking updated successfully", data: updated });
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { bookingStatus } = req.body;
  if (!bookingStatus) return res.status(400).json({ success: false, message: "bookingStatus is required" });

  const filter = { _id: id, isDeleted: false };
  applyUserScope(req, filter);

  const updated = await Booking.findOneAndUpdate(
    filter,
    { bookingStatus },
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ success: false, message: "Booking not found" });
  return res.status(200).json({ success: true, message: "Status updated successfully", data: updated });
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  applyUserScope(req, filter);

  const deleted = await Booking.findOneAndDelete(filter);
  if (!deleted) return res.status(404).json({ success: false, message: "Booking not found" });

  return res.status(200).json({ success: true, message: "Booking permanently deleted" });
});

const softDeleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const filter = { _id: id, isDeleted: false };
  applyUserScope(req, filter);

  const booking = await Booking.findOneAndUpdate(filter, { isDeleted: true }, { new: true });
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found or already deleted" });

  return res.status(200).json({ success: true, message: "Booking soft-deleted successfully" });
});

// === CUSTOM PARAMETER ROUTE CONTROLLERS ===

const getBookingByCustomId = asyncHandler(async (req, res) => {
  const filter = { bookingId: req.params.bookingId, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.findOne(filter).lean();
  if (!data) return res.status(404).json({ success: false, message: "Booking not found" });
  return res.status(200).json({ success: true, data });
});

const getBookingsByStatus = asyncHandler(async (req, res) => {
  const filter = { bookingStatus: req.params.status, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByCustomer = asyncHandler(async (req, res) => {
  const filter = { customerId: req.params.customerId, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByVehicleType = asyncHandler(async (req, res) => {
  const filter = { vehicleType: req.params.vehicleType, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByPaymentMethod = asyncHandler(async (req, res) => {
  const filter = { paymentMethod: req.params.method, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByPickupLocation = asyncHandler(async (req, res) => {
  const filter = { pickupLocation: req.params.location, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByDropLocation = asyncHandler(async (req, res) => {
  const filter = { dropLocation: req.params.location, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByDate = asyncHandler(async (req, res) => {
  const targetDate = new Date(req.params.date);
  targetDate.setHours(0, 0, 0, 0);
  const endDate = new Date(req.params.date);
  endDate.setHours(23, 59, 59, 999);

  const filter = { bookingDate: { $gte: targetDate, $lte: endDate }, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByTime = asyncHandler(async (req, res) => {
  const filter = { isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  const timeQuery = req.params.time; // expects HH:MM format
  const matched = data.filter(doc => {
    const formatted = doc.bookingDate.toISOString().substr(11, 5); // get HH:MM
    return formatted === timeQuery;
  });
  return res.status(200).json({ success: true, count: matched.length, data: matched });
});

const getBookingsByDriverRating = asyncHandler(async (req, res) => {
  const filter = { driverRating: parseFloat(req.params.rating), isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByCustomerRating = asyncHandler(async (req, res) => {
  const filter = { customerRating: parseFloat(req.params.rating), isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByDistance = asyncHandler(async (req, res) => {
  const filter = { distance: parseFloat(req.params.distance), isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByFareValue = asyncHandler(async (req, res) => {
  const filter = { fare: parseFloat(req.params.amount), isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByIncompleteStatus = asyncHandler(async (req, res) => {
  const filter = { isIncomplete: req.params.status, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByIncompleteReason = asyncHandler(async (req, res) => {
  const filter = { incompleteReason: req.params.reason, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByCancelCustomerReason = asyncHandler(async (req, res) => {
  const filter = { cancelledByCustomerReason: req.params.reason, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByCancelDriverReason = asyncHandler(async (req, res) => {
  const filter = { cancelledByDriverReason: req.params.reason, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByVTAT = asyncHandler(async (req, res) => {
  const filter = { vTat: parseInt(req.params.minutes, 10), isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByCTAT = asyncHandler(async (req, res) => {
  const filter = { cTat: parseInt(req.params.minutes, 10), isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByDay = asyncHandler(async (req, res) => {
  const filter = { isDeleted: false };
  applyUserScope(req, filter);
  filter.$expr = { $eq: [{ $dayOfMonth: "$bookingDate" }, parseInt(req.params.day, 10)] };
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByMonth = asyncHandler(async (req, res) => {
  const filter = { isDeleted: false };
  applyUserScope(req, filter);
  filter.$expr = { $eq: [{ $month: "$bookingDate" }, parseInt(req.params.month, 10)] };
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByYear = asyncHandler(async (req, res) => {
  const filter = { isDeleted: false };
  applyUserScope(req, filter);
  filter.$expr = { $eq: [{ $year: "$bookingDate" }, parseInt(req.params.year, 10)] };
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByHour = asyncHandler(async (req, res) => {
  const filter = { isDeleted: false };
  applyUserScope(req, filter);
  filter.$expr = { $eq: [{ $hour: "$bookingDate" }, parseInt(req.params.hour, 10)] };
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByMinute = asyncHandler(async (req, res) => {
  const filter = { isDeleted: false };
  applyUserScope(req, filter);
  filter.$expr = { $eq: [{ $minute: "$bookingDate" }, parseInt(req.params.minute, 10)] };
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByPickupSource = asyncHandler(async (req, res) => {
  const filter = { pickupLocation: { $regex: escapeRegex(req.params.pickup), $options: "i" }, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByDestination = asyncHandler(async (req, res) => {
  const filter = { dropLocation: { $regex: escapeRegex(req.params.drop), $options: "i" }, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getBookingsByVehicleImage = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true, count: 0, data: [], message: "Vehicle images search mock return" });
});

const getBookingsByFare = asyncHandler(async (req, res) => {
  const filter = { fare: parseFloat(req.params.value), isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getCustomerBookingHistory = asyncHandler(async (req, res) => {
  const filter = { customerId: req.params.customerId, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).sort({ bookingDate: -1 }).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getLatestCustomerBooking = asyncHandler(async (req, res) => {
  const filter = { customerId: req.params.customerId, isDeleted: false };
  applyUserScope(req, filter);
  const booking = await Booking.findOne(filter).sort({ bookingDate: -1 }).lean();
  if (!booking) return res.status(404).json({ success: false, message: "No bookings found for customer" });
  return res.status(200).json({ success: true, data: booking });
});

// === ADVANCED GET CONTROLLERS ===

const getTopHighestFareBookings = asyncHandler(async (req, res) => {
  const filter = { isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).sort({ fare: -1 }).limit(10).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getTopLowestFareBookings = asyncHandler(async (req, res) => {
  const filter = { isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).sort({ fare: 1 }).limit(10).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getRecentBookings = asyncHandler(async (req, res) => {
  const filter = { isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).sort({ bookingDate: -1 }).limit(10).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getLatestBookings = asyncHandler(async (req, res) => {
  const filter = { isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).sort({ bookingDate: -1 }).limit(5).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getRandomBookings = asyncHandler(async (req, res) => {
  const match = { isDeleted: false };
  if (req.user && req.user.role !== "admin") {
    match.userId = req.user._id;
  }
  const data = await Booking.aggregate([
    { $match: match },
    { $sample: { size: 5 } }
  ]);
  return res.status(200).json({ success: true, count: data.length, data });
});

const getTrendingBookings = asyncHandler(async (req, res) => {
  const filter = { bookingStatus: { $in: ["Success", "confirmed", "completed"] }, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).sort({ bookingDate: -1 }).limit(10).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getSuccessBookings = asyncHandler(async (req, res) => {
  const filter = { bookingStatus: "Success", isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getCancelledBookings = asyncHandler(async (req, res) => {
  const filter = { bookingStatus: { $in: ["Canceled by Customer", "Canceled by Driver"] }, isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getIncompleteBookings = asyncHandler(async (req, res) => {
  const filter = { isIncomplete: "Yes", isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const getDriverNotFoundBookings = asyncHandler(async (req, res) => {
  const filter = { bookingStatus: "Driver Not Found", isDeleted: false };
  applyUserScope(req, filter);
  const data = await Booking.find(filter).lean();
  return res.status(200).json({ success: true, count: data.length, data });
});

const compareBookings = asyncHandler(async (req, res) => {
  const { booking1, booking2 } = req.query;
  if (!booking1 || !booking2) {
    return res.status(400).json({ success: false, message: "booking1 and booking2 query parameters are required" });
  }

  const [b1, b2] = await Promise.all([
    Booking.findOne({ bookingId: booking1, isDeleted: false }).lean(),
    Booking.findOne({ bookingId: booking2, isDeleted: false }).lean()
  ]);

  if (!b1 || !b2) {
    return res.status(404).json({ success: false, message: "One or both bookings were not found" });
  }

  return res.status(200).json({
    success: true,
    data: { booking1: b1, booking2: b2, diff: { fareDiff: b1.fare - b2.fare, distanceDiff: b1.distance - b2.distance } }
  });
});

const getAISummary = asyncHandler(async (req, res) => {
  const total = await Booking.countDocuments({ isDeleted: false });
  const success = await Booking.countDocuments({ bookingStatus: "Success", isDeleted: false });
  const cancelled = await Booking.countDocuments({ bookingStatus: { $in: ["Canceled by Driver", "Canceled by Customer"] }, isDeleted: false });

  const aiText = `Out of ${total} total bookings, ${success} rides were successfully completed, while ${cancelled} bookings were cancelled. The platform continues to optimize vehicle allocations and matching times.`;
  return res.status(200).json({ success: true, summary: aiText });
});

// === EXTRA PATCH UPDATE CONTROLLERS ===

const updateBookingPayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paymentMethod, paymentStatus } = req.body;
  const filter = { _id: id, isDeleted: false };
  applyUserScope(req, filter);

  const updated = await Booking.findOneAndUpdate(
    filter,
    { paymentMethod, paymentStatus },
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ success: false, message: "Booking not found" });
  return res.status(200).json({ success: true, message: "Payment updated", data: updated });
});

const updateBookingRating = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { driverRating, customerRating, rating } = req.body;
  const filter = { _id: id, isDeleted: false };
  applyUserScope(req, filter);

  const updated = await Booking.findOneAndUpdate(
    filter,
    { driverRating, customerRating, rating },
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ success: false, message: "Booking not found" });
  return res.status(200).json({ success: true, message: "Ratings updated", data: updated });
});

const updateBookingFare = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { fare } = req.body;
  const filter = { _id: id, isDeleted: false };
  applyUserScope(req, filter);

  const updated = await Booking.findOneAndUpdate(
    filter,
    { fare: parseFloat(fare) },
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ success: false, message: "Booking not found" });
  return res.status(200).json({ success: true, message: "Fare updated", data: updated });
});

const updateBookingDistance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { distance } = req.body;
  const filter = { _id: id, isDeleted: false };
  applyUserScope(req, filter);

  const updated = await Booking.findOneAndUpdate(
    filter,
    { distance: parseFloat(distance) },
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ success: false, message: "Booking not found" });
  return res.status(200).json({ success: true, message: "Distance updated", data: updated });
});

const updateBookingLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { pickupLocation, dropLocation } = req.body;
  const filter = { _id: id, isDeleted: false };
  applyUserScope(req, filter);

  const updated = await Booking.findOneAndUpdate(
    filter,
    { pickupLocation, dropLocation },
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ success: false, message: "Booking not found" });
  return res.status(200).json({ success: true, message: "Locations updated", data: updated });
});

// === BULK AND CLEAN SLATE OPERATIONS ===

const bulkInsertBookings = asyncHandler(async (req, res) => {
  const { bookings } = req.body;
  if (!bookings || !Array.isArray(bookings)) {
    return res.status(400).json({ success: false, message: "bookings array is required" });
  }

  const mapped = bookings.map((b) => ({
    ...b,
    userId: req.user ? req.user._id : null,
    isDeleted: false
  }));

  const inserted = await Booking.insertMany(mapped);
  return res.status(201).json({ success: true, count: inserted.length, message: "Bulk bookings inserted successfully" });
});

const deleteAllBookings = asyncHandler(async (req, res) => {
  const filter = {};
  applyUserScope(req, filter);
  await Booking.deleteMany(filter);
  return res.status(200).json({ success: true, message: "Bookings collection cleared" });
});

const deleteCancelledRides = asyncHandler(async (req, res) => {
  const filter = { bookingStatus: { $in: ["Canceled by Driver", "Canceled by Customer"] } };
  applyUserScope(req, filter);
  const result = await Booking.deleteMany(filter);
  return res.status(200).json({ success: true, count: result.deletedCount, message: "Cancelled rides deleted successfully" });
});

// Helper regex escape function
const escapeRegex = (string) => string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  softDeleteBooking,
  
  // Custom GET param routes
  getBookingByCustomId,
  getBookingsByStatus,
  getBookingsByCustomer,
  getBookingsByVehicleType,
  getBookingsByPaymentMethod,
  getBookingsByPickupLocation,
  getBookingsByDropLocation,
  getBookingsByDate,
  getBookingsByTime,
  getBookingsByDriverRating,
  getBookingsByCustomerRating,
  getBookingsByDistance,
  getBookingsByFareValue,
  getBookingsByIncompleteStatus,
  getBookingsByIncompleteReason,
  getBookingsByCancelCustomerReason,
  getBookingsByCancelDriverReason,
  getBookingsByVTAT,
  getBookingsByCTAT,
  getBookingsByDay,
  getBookingsByMonth,
  getBookingsByYear,
  getBookingsByHour,
  getBookingsByMinute,
  getBookingsByPickupSource,
  getBookingsByDestination,
  getBookingsByVehicleImage,
  getBookingsByFare,
  getCustomerBookingHistory,
  getLatestCustomerBooking,
  
  // Advanced GET routes
  getTopHighestFareBookings,
  getTopLowestFareBookings,
  getRecentBookings,
  getLatestBookings,
  getRandomBookings,
  getTrendingBookings,
  getSuccessBookings,
  getCancelledBookings,
  getIncompleteBookings,
  getDriverNotFoundBookings,
  compareBookings,
  getAISummary,
  
  // Extra updates
  updateBookingPayment,
  updateBookingRating,
  updateBookingFare,
  updateBookingDistance,
  updateBookingLocation,
  
  // Bulk and delete operations
  bulkInsertBookings,
  deleteAllBookings,
  deleteCancelledRides,
};
