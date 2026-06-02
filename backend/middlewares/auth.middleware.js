const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Middleware to protect routes by validating JSON Web Tokens (JWT).
 * Decodes standard Bearer tokens and attaches the authenticated user to the request context.
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Verify that the Authorization header exists and has the Bearer prefix
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. Return Access Denied if no token is found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied"
      });
    }

    // 3. Verify and decode JWT token payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Locate user by the decoded token userId payload, ensuring they are active
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Access denied"
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account deactivated"
      });
    }

    // 5. Attach the authenticated Mongoose user document to the request context
    req.user = user;
    
    // Proceed to next middleware/handler
    return next();

  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    // Differentiate Token expired or malformed errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

module.exports = {
  protect
};
