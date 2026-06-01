const jwt = require("jsonwebtoken");

/**
 * Generates a signed JSON Web Token (JWT) for the authenticated user.
 * Reads configurations dynamically from environment variables.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {string} role - The authorization role of the user.
 * @returns {string} The signed JWT token.
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    }
  );
};

module.exports = generateToken;
