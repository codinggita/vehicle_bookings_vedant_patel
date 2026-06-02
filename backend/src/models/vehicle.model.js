const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, "Vehicle make is required"],
      trim: true
    },
    model: {
      type: String,
      required: [true, "Vehicle model is required"],
      trim: true
    },
    plateNumber: {
      type: String,
      required: [true, "Plate number is required"],
      unique: true,
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

vehicleSchema.index({ vehicleType: 1 });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
