/**
 * Reusable utility to build and validate MongoDB sorting configurations.
 * Handles field checks against an allowlist and resolves sort direction (asc/desc).
 *
 * @param {Object} query - The request query object (req.query) containing raw parameters.
 * @param {Object} [options] - Configuration overrides for defaults.
 * @param {string} [options.defaultSortBy="createdAt"] - Default field to sort by.
 * @param {string} [options.defaultOrder="desc"] - Default order (asc/desc).
 * @param {Array<string>} [options.allowedFields] - List of database fields allowed for sorting.
 * @returns {Object} An object structured for Mongoose's .sort() method.
 */
const getSortConfig = (query = {}, options = {}) => {
  const defaultSortBy = options.defaultSortBy || "createdAt";
  const defaultOrder = options.defaultOrder || "desc";
  const allowedFields = options.allowedFields || [
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

  let sortBy = query.sortBy || defaultSortBy;
  let order = query.order || defaultOrder;

  // Validate allowed fields to prevent arbitrary field injection
  if (!allowedFields.includes(sortBy)) {
    sortBy = defaultSortBy;
  }

  // Determine ascending or descending direction
  const direction = order.toLowerCase() === "asc" ? 1 : -1;

  return {
    [sortBy]: direction
  };
};

module.exports = {
  getSortConfig
};
