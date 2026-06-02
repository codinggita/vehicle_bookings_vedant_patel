const User = require("../models/user.model");

/**
 * Service class handling all database operations and query logic for User Authentication.
 * Decouples database operations from authentication controllers.
 */
class AuthService {
  /**
   * Find a user by email.
   * @param {string} email - The user email.
   * @returns {Promise<Object|null>} Mongoose User document or null.
   */
  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  /**
   * Find a user by email and explicitly include password.
   * @param {string} email - The user email.
   * @returns {Promise<Object|null>} Mongoose User document with password field selected or null.
   */
  async findUserByEmailWithPassword(email) {
    return await User.findOne({ email }).select("+password");
  }

  /**
   * Create and save a new user in the database.
   * @param {Object} userData - Cleaned user configuration payload.
   * @returns {Promise<Object>} Created Mongoose document.
   */
  async createUser(userData) {
    const newUser = new User(userData);
    return await newUser.save();
  }
}

module.exports = new AuthService();
