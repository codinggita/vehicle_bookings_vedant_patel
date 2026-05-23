const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
    },
    customerPhone: {
      type: String,
    },
    vehicleType: {
      type: String,
    },
    pickupLocation: {
      type: String,
    },
    dropLocation: {
      type: String,
    },
    distance: {
      type: Number,
    },
    fare: {
      type: Number,
    },
    bookingStatus: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
    rating: {
      type: Number,
    },
    bookingDate: {
      type: Date,
    },
    rideStartTime: {
      type: Date,
    },
    rideEndTime: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
