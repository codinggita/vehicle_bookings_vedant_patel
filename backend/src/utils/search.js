/**
 * Safely escapes special regex characters in a query string.
 * Prevents ReDoS (Regular Expression Denial of Service) and regex injection.
 *
 * @param {string} string - The raw search string.
 * @returns {string} The escaped string.
 */
const escapeRegex = (string) => {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

/**
 * Reusable utility to parse and construct a Mongoose $or query for keyword search.
 * Searches across multiple predefined searchable fields.
 *
 * @param {Object} query - The request query object (req.query).
 * @returns {Object} A Mongoose-compatible search query object.
 */
const getSearchConfig = (query = {}) => {
  if (!query.search || String(query.search).trim() === "") {
    return {};
  }

  const searchTerm = String(query.search).trim();
  const escapedTerm = escapeRegex(searchTerm);

  const searchableFields = [
    "customerName",
    "vehicleType",
    "pickupLocation",
    "dropLocation",
    "customerPhone",
    "paymentMethod",
    "bookingStatus"
  ];

  const searchConditions = searchableFields.map((field) => ({
    [field]: { $regex: escapedTerm, $options: "i" }
  }));

  return {
    $or: searchConditions
  };
};

module.exports = {
  getSearchConfig
};
