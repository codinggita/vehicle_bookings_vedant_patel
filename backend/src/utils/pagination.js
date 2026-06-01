/**
 * Reusable utility to process, validate, and compute pagination configurations.
 * Handles non-numeric values, negative numbers, and enforces safe boundary limits.
 * 
 * @param {Object} query - The request query object (req.query) containing raw parameters
 * @param {Object} [options] - Overrides for defaults
 * @param {number} [options.defaultPage=1] - Fallback page
 * @param {number} [options.defaultLimit=10] - Fallback limit
 * @param {number} [options.maxLimit=100] - Hard upper ceiling for limit
 * @returns {Object} An object containing parsed page, limit, and computed skip configurations
 */
const getPaginationConfig = (query = {}, options = {}) => {
  const defaultPage = options.defaultPage || 1;
  const defaultLimit = options.defaultLimit || 10;
  const maxLimit = options.maxLimit || 100;

  // 1. Sanitize and validate page parameter
  let page = parseInt(query.page, 10);
  if (isNaN(page) || page <= 0) {
    page = defaultPage;
  }

  // 2. Sanitize and validate limit parameter
  let limit = parseInt(query.limit, 10);
  if (isNaN(limit) || limit <= 0) {
    limit = defaultLimit;
  }

  // 3. Enforce maximum boundary to protect database from massive scans
  if (limit > maxLimit) {
    limit = maxLimit;
  }

  // 4. Calculate database skip offset
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip
  };
};

module.exports = {
  getPaginationConfig
};
