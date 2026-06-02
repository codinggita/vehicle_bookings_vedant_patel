const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Booking ID is required"]
    },
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Amount cannot be negative"]
    },
    method: {
      type: String,
      required: [true, "Payment method is required"],
      enum: {
        values: ["cash", "card", "upi", "net_banking"],
        message: "{VALUE} is not a valid payment method"
      }
    },
    status: {
      type: String,
      required: [true, "Payment status is required"],
      enum: {
        values: ["pending", "paid", "failed", "refunded"],
        message: "{VALUE} is not a valid payment status"
      },
      default: "pending"
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

paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ status: 1 });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
