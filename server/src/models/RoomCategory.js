import mongoose from "mongoose";

const roomCategorySchema = new mongoose.Schema(
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
    // Category Name
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // =========================
    // Category Description
    // =========================

    description: {
      type: String,
      trim: true,
      default: "",
    },

    // =========================
    // Guest Capacity
    // =========================

    maxGuests: {
      type: Number,
      required: true,
      min: 1,
    },

    // =========================
    // Bed Information
    // =========================

    bedType: {
      type: String,
      trim: true,
      default: "",
      maxlength: 100,
    },

    // =========================
    // Amenities
    // =========================

    amenities: {
      type: [String],
      default: [],
    },

    // =========================
    // Category Images
    // =========================

    images: {
      type: [String],
      default: [],
    },

    // =========================
    // Category Status
    // =========================

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Same category name cannot be duplicated
// inside the same hotel.
roomCategorySchema.index(
  { hotel: 1, name: 1 },
  { unique: true }
);

const RoomCategory = mongoose.model(
  "RoomCategory",
  roomCategorySchema
);

export default RoomCategory;