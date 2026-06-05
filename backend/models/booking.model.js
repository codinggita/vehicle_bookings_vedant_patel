const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    bookingId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    customerId: {
      type: String,
      trim: true,
    },
    customerName: {
      type: String,
      trim: true,
      default: null,
    },
    customerPhone: {
      type: String,
      trim: true,
      default: null,
    },
    vehicleType: {
      type: String,
      required: [true, "Vehicle type is required"],
      trim: true,
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
      default: "pending",
    },
    paymentMethod: {
      type: String,
      trim: true,
      default: null,
    },
    paymentStatus: {
      type: String,
      trim: true,
      default: "pending",
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: null,
    },
    driverRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: null,
    },
    customerRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: null,
    },
    vTat: {
      type: Number,
      default: null,
    },
    cTat: {
      type: Number,
      default: null,
    },
    cancelledByCustomerReason: {
      type: String,
      default: null,
      trim: true,
    },
    cancelledByDriverReason: {
      type: String,
      default: null,
      trim: true,
    },
    isIncomplete: {
      type: String,
      default: null,
      trim: true,
    },
    incompleteReason: {
      type: String,
      default: null,
      trim: true,
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
bookingSchema.index({ customerId: 1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ vehicleType: 1 });
bookingSchema.index({ bookingDate: -1 });
bookingSchema.index({ paymentMethod: 1 });
bookingSchema.index({ customerName: 1 });
bookingSchema.index({ pickupLocation: 1 });
bookingSchema.index({ dropLocation: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
