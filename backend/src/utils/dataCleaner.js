/**
 * Utility functions for cleaning and normalizing raw dataset values before database insertion.
 * Ensures consistent types, prevents NaN errors, and sanitizes corrupt or empty values.
 */

/**
 * Normalizes invalid or empty values into JavaScript null.
 * Handles common dirty data markers such as "null", "undefined", "#NAME?", "N/A", and empty strings.
 * 
 * @param {any} val - The raw value to convert.
 * @returns {any|null} The normalized value or null.
 */
const toNull = (val) => {
  if (val === undefined || val === null) return null;
  
  const str = String(val).trim().toLowerCase();
  
  if (
    str === "" ||
    str === "null" ||
    str === "undefined" ||
    str === "n/a" ||
    str === "#name?"
  ) {
    return null;
  }
  
  return val;
};

/**
 * Safely converts a raw value into a Number.
 * Standardizes integers/decimals, removes invalid markers, and clamps/defaults values to avoid NaN.
 * 
 * @param {any} val - The raw value to convert.
 * @param {number|null} fallback - Optional fallback value if conversion fails.
 * @returns {number|null} The converted number or null/fallback.
 */
const toNumber = (val, fallback = null) => {
  const cleanedVal = toNull(val);
  if (cleanedVal === null) return fallback;
  
  // Remove common non-numeric characters (like currency symbols, commas, spaces)
  const numStr = String(cleanedVal).replace(/[^0-9.-]/g, "");
  
  const parsed = parseFloat(numStr);
  if (isNaN(parsed)) {
    return fallback;
  }
  
  return parsed;
};

/**
 * Safely converts a raw value into a Date object.
 * Validates dates and returns null for invalid formats to prevent MongoDB errors.
 * 
 * @param {any} val - The raw date value to convert.
 * @param {any} fallback - Optional fallback if conversion fails.
 * @returns {Date|null} Valid Date object or null.
 */
const toDate = (val, fallback = null) => {
  const cleanedVal = toNull(val);
  if (cleanedVal === null) return fallback;
  
  // Try to parse the date
  const parsedDate = new Date(cleanedVal);
  
  // Check if the date is valid (getTime() is not NaN)
  if (isNaN(parsedDate.getTime())) {
    return fallback;
  }
  
  return parsedDate;
};

/**
 * Cleans string inputs by trimming whitespaces and checking for null values.
 * Can also normalize casing if specified.
 * 
 * @param {any} val - The raw string value to clean.
 * @param {boolean} normalizeCasing - Whether to convert to lowercase/uppercase.
 * @returns {string|null} The cleaned string or null.
 */
const sanitizeString = (val, normalizeCasing = false) => {
  const cleanedVal = toNull(val);
  if (cleanedVal === null) return null;
  
  const trimmed = String(cleanedVal).trim();
  return normalizeCasing ? trimmed.toLowerCase() : trimmed;
};

module.exports = {
  toNull,
  toNumber,
  toDate,
  sanitizeString
};
