/**
 * Global Error Handling Middleware.
 * Intercepts all application rejections and errors, normalizing them into consistent, compliant JSON responses.
 */
const globalErrorHandler = (err, req, res, next) => {
  // Set default fallback values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  // 1. Handle Mongoose CastError (e.g., Invalid MongoDB ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource id";
  }

  // 2. Handle Mongoose Schema ValidationError
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    // Optional: Extract granular error fields if needed for advanced responses
    const errors = Object.values(err.errors).map((val) => val.message);
    if (errors.length > 0) {
      message = errors.join(", ");
    }
  }

  // 3. Handle MongoDB Duplicate Key Error (Code 11000)
  if (err.code === 11000) {
    statusCode = 400;
    message = "Resource already exists";
  }

  // Log error stack trace in non-production environments
  if (process.env.NODE_ENV !== "production") {
    console.error("Error Logged:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
  }

  return res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = globalErrorHandler;
