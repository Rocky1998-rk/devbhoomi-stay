import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    // Hotel Owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic Information
    hotelName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    // Contact Information
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    // Location
    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      default: "Uttarakhand",
      trim: true,
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },

    // Hotel Images
    images: [
      {
        type: String,
        trim: true,
      },
    ],

    // Hotel Facilities
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],

    // Check-in / Check-out
    checkInTime: {
      type: String,
      default: "12:00 PM",
    },

    checkOutTime: {
      type: String,
      default: "11:00 AM",
    },

    // Hotel Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;