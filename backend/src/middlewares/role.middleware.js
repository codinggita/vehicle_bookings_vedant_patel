/**
 * Middleware factory to authorize specific user roles.
 * Restricts access to route endpoints based on req.user.role parameter context.
 *
 * @param {...string} roles - The list of permitted user roles.
 * @returns {Function} Express middleware function checking authorization.
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // 1. Assert that the request contains authenticated user context
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Access forbidden"
      });
    }

    // 2. Check if the user's role exists inside the permitted list
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access forbidden"
      });
    }

    // 3. Proceed to next handler/middleware
    return next();
  };
};

module.exports = {
  authorizeRoles
};
