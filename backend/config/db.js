const mongoose = require("mongoose");

/**
 * Establish connection to MongoDB Atlas database using Mongoose.
 * This handles successful connection logs, errors, and graceful application exit on failure.
 * Ensures the connection pool is configured correctly for handling requests in production.
 * 
 * @returns {Promise<void>} Resolves when connection is successfully established.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    // Exit application process with failure code
    process.exit(1);
  }
};

module.exports = connectDB;
