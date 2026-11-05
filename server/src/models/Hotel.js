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

    website: {
      type: String,
      trim: true,
      default: "",
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

    pincode: {
      type: String,
      trim: true,
      default: "246155",
    },

    hotelType: {
      type: String,
      enum: [
        "Budget Hotel",
        "Deluxe Hotel",
        "Luxury Hotel",
        "Homestay",
        "Boutique Hotel",
        "Resort",
      ],
      default: "Boutique Hotel",
      index: true,
    },

    // Hotel Capacity & Structure (UI Metric Cards)
    totalRooms: {
      type: Number,
      default: 12,
    },

    roomCategories: {
      type: Number,
      default: 4,
    },

    guestCapacity: {
      type: String,
      default: "2 – 1",
      trim: true,
    },

    floors: {
      type: Number,
      default: 2,
    },

    // Rating & Reviews (UI Header)
    rating: {
      type: Number,
      default: 4.6,
      min: 1,
      max: 5,
    },

    reviewsCount: {
      type: Number,
      default: 128,
    },

    // Hotel Capacity & Structure (UI Metric Cards)
    totalRooms: {
      type: Number,
      default: 12,
    },

    roomCategories: {
      type: Number,
      default: 4,
    },

    guestCapacity: {
      type: String,
      default: "2 – 6",
      trim: true,
    },

    floors: {
      type: Number,
      default: 2,
    },

    // Rating & Reviews (UI Header)
    rating: {
      type: Number,
      default: 4.6,
      min: 1,
      max: 5,
    },

    reviewsCount: {
      type: Number,
      default: 128,
    },

    // Hotel Images
    images: [
      {
        type: String,
        trim: true,
      },
    ],

    coverImage: {
      type: String,
      default: null,
    },

    latitude: {
      type: Number,
      default: null,
    },

    longitude: {
      type: Number,
      default: null,
    },

    googleMapsUrl: {
      type: String,
      default: null,
    },

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

    // Guest Rules & Policies
    policies: {
      checkInOutPolicy: {
        type: String,
        default:
          "Standard check-in starts at 12:00 PM and check-out is by 11:00 AM. Government ID verification is required for all adult guests.",
      },
      cancellationPolicy: {
        type: String,
        default:
          "Free cancellation up to 48 hours before check-in date. Cancellations within 48 hours forfeit the 25% advance token deposit.",
      },
      quietHoursPolicy: {
        type: String,
        default:
          "Quiet hours are observed between 10:00 PM – 07:00 AM. Evening bonfires are held in the designated lawn area weather permitting.",
      },
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
