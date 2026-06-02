/**
/**
 * Application-wide constants and enums for the Vehicle Booking System.
 * Prevents hardcoding of string variables across controllers, models, and middlewares.
 */

const USER_ROLES = {
  USER: "user",
  ADMIN: "admin"
};

const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
};

const PAYMENT_METHOD = {
  CASH: "cash",
  CARD: "card",
  UPI: "upi",
  NET_BANKING: "net_banking"
};

const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded"
};

const VEHICLE_TYPE = {
  SEDAN: "sedan",
  SUV: "suv",
  HATCHBACK: "hatchback",
  LUXURY: "luxury",
  MINI: "mini",
  PLUS: "plus",
  BIKE: "bike",
  EBIKE: "ebike",
  AUTO: "auto"
};

module.exports = {
  USER_ROLES,
  BOOKING_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  VEHICLE_TYPE
};
