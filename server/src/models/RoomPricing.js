import mongoose from "mongoose";

const roomPricingSchema = new mongoose.Schema(
  {
    // =========================
    // Room Reference
    // =========================

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    // =========================
    // Hotel Reference
    // =========================

    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    // =========================
    // Pricing Type
    // =========================

    pricingType: {
      type: String,
      enum: [
        "normal",
        "season",
        "blackout",
      ],
      required: true,
    },

    // =========================
    // Pricing Name
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // Date Range
    // =========================

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    // =========================
    // Price
    // =========================

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

    // =========================
    // Priority
    // =========================

    priority: {
      type: Number,
      default: 1,
      min: 1,
    },

    // =========================
    // Active / Inactive
    // =========================

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


// =========================
// Date Validation
// =========================

roomPricingSchema.pre("validate", function () {
  if (this.endDate < this.startDate) {
    throw new Error(
      "End date cannot be before start date"
    );
  }
});


const RoomPricing = mongoose.model(
  "RoomPricing",
  roomPricingSchema
);

export default RoomPricing;