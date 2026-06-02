const rateLimit = require("express-rate-limit");

/**
 * Rate Limiting Middleware.
 * Limits the number of requests per IP address to prevent API abuse, denial-of-service (DoS) attacks, or credential brute-forcing.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Maximum of 100 requests per IP within the windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: "Too many requests, please try again later"
  },
  statusCode: 429 // Standard HTTP Too Many Requests code
});

module.exports = apiLimiter;
