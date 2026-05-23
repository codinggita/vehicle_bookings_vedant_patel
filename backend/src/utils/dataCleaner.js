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

module.exports = {
  toNull,
  toNumber
};
