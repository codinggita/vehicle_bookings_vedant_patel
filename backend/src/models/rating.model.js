const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Booking ID is required"]
    },
    score: {
      type: Number,
      required: [true, "Rating score is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"]
    },
    review: {
      type: String,
      trim: true,
      default: ""
    },
    type: {
      type: String,
      required: [true, "Rating type is required"],
      enum: {
        values: ["driver", "customer"],
        message: "{VALUE} is not a valid rating type"
      }
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

ratingSchema.index({ bookingId: 1 });
ratingSchema.index({ score: 1 });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
