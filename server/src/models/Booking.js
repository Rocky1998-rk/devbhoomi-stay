import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // =========================
    // Hotel Reference
    // =========================

    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true,
    },

    // =========================
    // Room Reference
    // =========================

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      index: true,
    },

    // =========================
    // Room Category Reference
    // =========================

    roomCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomCategory",
      required: true,
      index: true,
    },

    // =========================
    // Guest Information
    // =========================

    guestName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    guestPhone: {
      type: String,
      required: true,
      trim: true,
    },

    guestEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    // =========================
    // Booking Dates
    // =========================

    checkIn: {
      type: Date,
      required: true,
      index: true,
    },

    checkOut: {
      type: Date,
      required: true,
      index: true,
    },

    // =========================
    // Stay Duration
    // =========================

    totalNights: {
      type: Number,
      required: true,
      min: 1,
    },

    // ========================= Pricing Snapshot =========================

    pricingType: {
      type: String,
      enum: ["normal", "season", "blackout"],
      required: true,
    },

    pricingName: {
      type: String,
      required: true,
      trim: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

    totalRoomPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    pricingBreakdown: [
  {
    date: {
      type: Date,
      required: true,
    },

    pricingType: {
      type: String,
      enum: ["normal", "season", "blackout"],
      required: true,
    },

    pricingName: {
      type: String,
      required: true,
      trim: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
  },
],

    // =========================
    // Booking Status
    // =========================

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
      ],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// =========================
// Date Validation
// =========================

bookingSchema.pre("validate", function () {
  if (this.checkIn && this.checkOut) {
    if (this.checkOut <= this.checkIn) {
      throw new Error("Check-out date must be after check-in date");
    }
  }
});

// =========================
// Index for Availability
// =========================

bookingSchema.index({
  room: 1,
  checkIn: 1,
  checkOut: 1,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;