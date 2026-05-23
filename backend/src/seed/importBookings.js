const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const connectDB = require("../config/db");

/**
 * Seeds raw booking JSON data into MongoDB.
 */
const seedBookings = async () => {
  try {
    // 1. Connect to Database
    await connectDB();
    console.log("Database connected successfully");

    // 2. Read raw dataset
    const dataPath = path.join(__dirname, "../../data/bookings.json");
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Raw dataset not found at: ${dataPath}`);
    }

    const rawData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    console.log(`Loaded raw dataset with ${rawData.length} records`);

    console.log("Import script initialized successfully");

  } catch (error) {
    console.error("Fatal error during seeding operation:", error.message);
    process.exit(1);
  } finally {
    // 3. Close database connection gracefully
    await mongoose.disconnect();
    console.log("Database connection closed gracefully");
    process.exit(0);
  }
};

// Execute seed script
seedBookings();
