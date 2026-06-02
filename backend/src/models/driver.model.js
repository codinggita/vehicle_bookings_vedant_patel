const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Driver email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: [true, "Driver phone is required"],
      trim: true
    },
    vehicleType: {
      type: String,
      required: [true, "Vehicle type is required"],
      enum: {
        values: ["sedan", "suv", "hatchback", "luxury", "mini", "plus", "bike", "ebike", "auto"],
        message: "{VALUE} is not a valid vehicle type"
      }
    },
    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      trim: true,
      unique: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

driverSchema.index({ isDeleted: 1 });

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
