const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const connectDB = require("../config/db");
const Booking = require("../models/booking.model");
const {
  toNull,
  toNumber,
  toDate,
  sanitizeString
} = require("../utils/dataCleaner");

/**
 * Reads, cleans, normalizes, and bulk-inserts raw booking JSON data into MongoDB.
 */
const seedBookings = async () => {
  try {
    // 1. Connect to Database
    await connectDB();
    console.log("Database connected successfully");

    // 2. Read and parse raw dataset
    const dataPath = path.join(__dirname, "../../data/bookings.json");
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Raw dataset not found at: ${dataPath}`);
    }

    const rawData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    console.log(`Loaded raw dataset with ${rawData.length} records`);

    // 3. Clean and normalize records
    console.log("Cleaning dataset...");
    const cleanedRecords = [];

    for (let i = 0; i < rawData.length; i++) {
      const raw = rawData[i];

      // Validate critical fields with fallbacks
      const customerName = sanitizeString(raw.customerName) || "Unknown Customer";
      const vehicleType = sanitizeString(raw.vehicleType, true) || "sedan";
      const pickupLocation = sanitizeString(raw.pickupLocation) || "Unknown Pickup";
      const dropLocation = sanitizeString(raw.dropLocation) || "Unknown Drop";
      const distance = toNumber(raw.distance, 0);
      const fare = toNumber(raw.fare, 0);
      const bookingStatus = sanitizeString(raw.bookingStatus, true) || "pending";
      const paymentMethod = sanitizeString(raw.paymentMethod, true) || "cash";
      const paymentStatus = sanitizeString(raw.paymentStatus, true) || "pending";
      const rating = toNumber(raw.rating, null);
      const bookingDate = toDate(raw.bookingDate) || new Date();
      const rideStartTime = toDate(raw.rideStartTime, null);
      const rideEndTime = toDate(raw.rideEndTime, null);

      // Cleaned document matching Mongoose model schema
      const cleaned = {
        customerName,
        customerPhone: sanitizeString(raw.customerPhone),
        vehicleType,
        pickupLocation,
        dropLocation,
        distance,
        fare,
        bookingStatus,
        paymentMethod,
        paymentStatus,
        rating,
        bookingDate,
        rideStartTime,
        rideEndTime,
        isDeleted: false
      };

      cleanedRecords.push(cleaned);
    }

    // 4. Clear existing bookings in collection to ensure clean slate
    console.log("Clearing existing bookings from database...");
    await Booking.deleteMany({});

    // 5. Bulk insert cleaned records into MongoDB
    console.log("Importing bookings...");
    const result = await Booking.insertMany(cleanedRecords);
    console.log(`Bookings inserted successfully! Total records: ${result.length}`);

  } catch (error) {
    console.error("Fatal error during seeding operation:", error.message);
    process.exit(1);
  } finally {
    // 6. Close database connection gracefully
    await mongoose.disconnect();
    console.log("Database connection closed gracefully");
    process.exit(0);
  }
};

// Execute seed script
seedBookings();
