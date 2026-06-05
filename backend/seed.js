const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

const connectDB = require("./config/db");
const Booking = require("./models/booking.model");

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully for seeding.");

    const dataPath = path.join(__dirname, "data/bookings.json");
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Data file not found at: ${dataPath}`);
    }

    console.log("Reading raw bookings dataset...");
    const rawData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    console.log(`Loaded ${rawData.length} records. Cleaning and mapping data...`);

    const cleanedRecords = rawData.map((raw) => {
      // Helper to parse ratings / numeric values that might be "null" or invalid numbers
      const parseNumber = (val) => {
        if (val === undefined || val === null || String(val).trim().toLowerCase() === "null") return null;
        const parsed = parseFloat(val);
        return isNaN(parsed) ? null : parsed;
      };

      // Helper for nullable strings
      const parseString = (val) => {
        if (val === undefined || val === null || String(val).trim().toLowerCase() === "null" || String(val).trim() === "") return null;
        return String(val).trim();
      };

      return {
        bookingId: parseString(raw.Booking_ID),
        customerId: parseString(raw.Customer_ID),
        bookingDate: raw.Date ? new Date(raw.Date) : new Date(),
        bookingStatus: parseString(raw.Booking_Status) || "pending",
        vehicleType: parseString(raw.Vehicle_Type) || "sedan",
        pickupLocation: parseString(raw.Pickup_Location) || "unknown",
        dropLocation: parseString(raw.Drop_Location) || "unknown",
        vTat: parseNumber(raw.V_TAT),
        cTat: parseNumber(raw.C_TAT),
        cancelledByCustomerReason: parseString(raw.Canceled_Rides_by_Customer),
        cancelledByDriverReason: parseString(raw.Canceled_Rides_by_Driver),
        isIncomplete: parseString(raw.Incomplete_Rides),
        incompleteReason: parseString(raw.Incomplete_Rides_Reason),
        fare: parseNumber(raw.Booking_Value) || 0,
        paymentMethod: parseString(raw.Payment_Method),
        distance: parseNumber(raw.Ride_Distance) || 0,
        driverRating: parseNumber(raw.Driver_Ratings),
        customerRating: parseNumber(raw.Customer_Rating),
        isDeleted: false,
      };
    });

    console.log("Clearing existing bookings collection...");
    await Booking.deleteMany({});

    console.log("Bulk inserting records into MongoDB...");
    const chunk = 2000;
    for (let i = 0; i < cleanedRecords.length; i += chunk) {
      const slice = cleanedRecords.slice(i, i + chunk);
      await Booking.insertMany(slice);
      console.log(`Inserted records ${i} to ${Math.min(i + chunk, cleanedRecords.length)}`);
    }

    console.log("✔ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Fatal error during database seeding:", error.message);
    process.exit(1);
  }
};

seedDatabase();
