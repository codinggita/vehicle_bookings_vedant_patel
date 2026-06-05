const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    customerPhone: {
      type: String,
      trim: true,
    },
    vehicleType: {
      type: String,
      required: [true, "Vehicle type is required"],
      trim: true,
      enum: {
        values: ["sedan", "suv", "hatchback", "luxury"],
        message: "{VALUE} is not a valid vehicle type",
      },
    },
    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
      trim: true,
    },
    dropLocation: {
      type: String,
      required: [true, "Drop location is required"],
      trim: true,
    },
    distance: {
      type: Number,
      required: [true, "Distance is required"],
      min: [0, "Distance cannot be negative"],
    },
    fare: {
      type: Number,
      required: [true, "Fare is required"],
      min: [0, "Fare cannot be negative"],
    },
    bookingStatus: {
      type: String,
      required: [true, "Booking status is required"],
      trim: true,
      enum: {
        values: ["pending", "confirmed", "completed", "cancelled"],
        message: "{VALUE} is not a valid booking status",
      },
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
      enum: {
        values: ["cash", "card", "upi", "net_banking"],
        message: "{VALUE} is not a valid payment method",
      },
    },
    paymentStatus: {
      type: String,
      required: [true, "Payment status is required"],
      trim: true,
      enum: {
        values: ["pending", "paid", "failed", "refunded"],
        message: "{VALUE} is not a valid payment status",
      },
      default: "pending",
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: null,
    },
    bookingDate: {
      type: Date,
      required: [true, "Booking date is required"],
      default: Date.now,
    },
    rideStartTime: {
      type: Date,
      default: null,
    },
    rideEndTime: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for query performance optimization
bookingSchema.index({ userId: 1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ vehicleType: 1 });
bookingSchema.index({ bookingDate: -1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ customerName: 1 });
bookingSchema.index({ paymentMethod: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
