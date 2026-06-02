const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables immediately
dotenv.config();

const connectDB = require("../config/db");
const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const {
  toNull,
  toNumber,
  toDate,
  sanitizeString
} = require("../utils/dataCleaner");

/**
 * Robust database seeder to clean, normalize, and bulk insert the raw bookings dataset.
 */
const runSeeder = async () => {
  try {
    // 1. Establish connection to MongoDB Atlas
    await connectDB();
    console.log("Database connected successfully for seeding");

    // 2. Read raw bookings dataset
    const rawDataPath = path.join(__dirname, "../../data/bookings.json");
    if (!fs.existsSync(rawDataPath)) {
      throw new Error(`Raw dataset not found at: ${rawDataPath}`);
    }

    const rawData = JSON.parse(fs.readFileSync(rawDataPath, "utf8"));
    console.log(`Loaded raw dataset with ${rawData.length} records`);

    // 3. Clear existing booking database collections
    console.log("Clearing existing bookings from database...");
    await Booking.deleteMany({});

    // 4. Transform and clean records
    console.log("Normalizing and cleaning dataset...");
    const cleanedRecords = [];
    let failedRecordsCount = 0;

    for (let i = 0; i < rawData.length; i++) {
      const raw = rawData[i];
      try {
        // Validate and clean critical fields
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

        const cleanedDoc = {
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

        cleanedRecords.push(cleanedDoc);
      } catch (err) {
        failedRecordsCount++;
      }
    }

    // 5. Bulk insert records using insertMany
    console.log("Bulk importing cleaned records...");
    const result = await Booking.insertMany(cleanedRecords);

    // Log exact seeder success output requested by Phase 3 prompt
    console.log("✔ Data import completed");
    console.log(`✔ Total records inserted: ${result.length}`);
    console.log(`✔ Failed records: ${failedRecordsCount}`);

  } catch (error) {
    console.error("❌ MongoDB connection or seeder process failed:", error.message);
    process.exit(1);
  } finally {
    // Graceful disconnect
    await mongoose.disconnect();
    console.log("Database connection closed gracefully");
    process.exit(0);
  }
};

// Execute seeder
runSeeder();
