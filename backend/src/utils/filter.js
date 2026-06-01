const { sanitizeString, toNumber } = require("./dataCleaner");

/**
 * Reusable utility to parse, validate, and construct MongoDB query filter objects.
 * Safely extracts status, payment status, vehicle type, rating, fare range, and distance range filters.
 *
 * @param {Object} query - The request query object (req.query) containing raw inputs.
 * @returns {Object} A sanitized Mongoose-compatible filter query object.
 */
const getFilterConfig = (query = {}) => {
  const filter = {};

  // 1. Booking Status (status query param maps to bookingStatus field in schema)
  if (query.status !== undefined && query.status !== "") {
    const sanitizedStatus = sanitizeString(query.status, true);
    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (sanitizedStatus && allowedStatuses.includes(sanitizedStatus)) {
      filter.bookingStatus = sanitizedStatus;
    }
  }

  // 2. Payment Status
  if (query.paymentStatus !== undefined && query.paymentStatus !== "") {
    const sanitizedPayment = sanitizeString(query.paymentStatus, true);
    const allowedPayments = ["pending", "paid", "failed", "refunded"];
    if (sanitizedPayment && allowedPayments.includes(sanitizedPayment)) {
      filter.paymentStatus = sanitizedPayment;
    }
  }

  // 3. Vehicle Type
  if (query.vehicleType !== undefined && query.vehicleType !== "") {
    const sanitizedVehicle = sanitizeString(query.vehicleType, true);
    const allowedVehicles = ["sedan", "suv", "hatchback", "luxury"];
    if (sanitizedVehicle && allowedVehicles.includes(sanitizedVehicle)) {
      filter.vehicleType = sanitizedVehicle;
    }
  }

  // 4. Rating
  if (query.rating !== undefined && query.rating !== "") {
    const parsedRating = toNumber(query.rating);
    if (parsedRating !== null && parsedRating >= 1 && parsedRating <= 5) {
      filter.rating = parsedRating;
    }
  }

  // 5. Fare Range
  if (
    (query.minFare !== undefined && query.minFare !== "") ||
    (query.maxFare !== undefined && query.maxFare !== "")
  ) {
    const fareQuery = {};
    if (query.minFare !== undefined && query.minFare !== "") {
      const minFare = toNumber(query.minFare);
      if (minFare !== null && minFare >= 0) {
        fareQuery.$gte = minFare;
      }
    }
    if (query.maxFare !== undefined && query.maxFare !== "") {
      const maxFare = toNumber(query.maxFare);
      if (maxFare !== null && maxFare >= 0) {
        fareQuery.$lte = maxFare;
      }
    }
    if (Object.keys(fareQuery).length > 0) {
      filter.fare = fareQuery;
    }
  }

  // 6. Distance Range
  if (
    (query.minDistance !== undefined && query.minDistance !== "") ||
    (query.maxDistance !== undefined && query.maxDistance !== "")
  ) {
    const distanceQuery = {};
    if (query.minDistance !== undefined && query.minDistance !== "") {
      const minDistance = toNumber(query.minDistance);
      if (minDistance !== null && minDistance >= 0) {
        distanceQuery.$gte = minDistance;
      }
    }
    if (query.maxDistance !== undefined && query.maxDistance !== "") {
      const maxDistance = toNumber(query.maxDistance);
      if (maxDistance !== null && maxDistance >= 0) {
        distanceQuery.$lte = maxDistance;
      }
    }
    if (Object.keys(distanceQuery).length > 0) {
      filter.distance = distanceQuery;
    }
  }

  return filter;
};

module.exports = {
  getFilterConfig
};
