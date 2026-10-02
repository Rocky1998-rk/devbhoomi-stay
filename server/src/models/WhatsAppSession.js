import mongoose from "mongoose";

const whatsappSessionSchema = new mongoose.Schema(
  {
    // =========================
    // Customer Identity
    // =========================

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    contactNumber: {
    type: String,
    trim: true,
    default: "",
    },

    customerName: {
      type: String,
      trim: true,
      default: "",
    },

    language: {
      type: String,
      enum: ["hindi", "english"],
      default: null,
    },

    // =========================
    // Current WhatsApp Flow Step
    // =========================

    currentStep: {
      type: String,
      enum: [
        "welcome",
        "home",
        "select_destination",
        "select_check_in",
        "select_check_out",
        "adults",
        "children",
        "budget",
        "hotel_type",
        "searching_hotels",
        "hotels_found",
        "hotel_details",
        "hotel_photos",
        "hotel_location",
        "enter_name",
        "share_contact",
        "booking_summary",
        "confirm_booking",
        "advance_payment",
        "payment_gateway",
        "payment_success",
        "booking_confirmed",
        "download_voucher",
        "voucher_pdf",
        "thank_you",
      ],
      default: "welcome",
      index: true,
    },

    // =========================
    // Search / Booking Details
    // =========================

    destination: {
      type: String,
      enum: ["Lansdowne", "Kotdwar"],
      default: null,
    },

    checkIn: {
      type: Date,
      default: null,
    },

    checkOut: {
      type: Date,
      default: null,
    },

    adults: {
      type: Number,
      min: 1,
      default: null,
    },

    children: {
      type: Number,
      min: 0,
      default: 0,
    },

    // =========================
    // Budget
    // =========================

    budget: {
      label: {
        type: String,
        enum: [
          "1500-2500",
          "2500-4000",
          "4000-6000",
          "luxury",
        ],
        default: null,
      },

      min: {
        type: Number,
        default: null,
      },

      max: {
        type: Number,
        default: null,
      },
    },

    // =========================
    // Hotel Type
    // =========================

    hotelType: {
      type: String,
      enum: [
        "Budget Hotel",
        "Deluxe Hotel",
        "Luxury Hotel",
        "Homestay",
      ],
      default: null,
    },

    // =========================
    // Selected Hotel / Room
    // =========================

    selectedHotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      default: null,
    },

    selectedRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },

    selectedRoomCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomCategory",
      default: null,
    },

    // =========================
    // Guest Details
    // =========================

    guestName: {
      type: String,
      trim: true,
      default: "",
    },

    contactNumber: {
      type: String,
      trim: true,
      default: "",
    },

    // =========================
    // Booking
    // =========================

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },

    bookingAmount: {
      type: Number,
      default: null,
    },

    advanceAmount: {
      type: Number,
      default: null,
    },

    // =========================
    // Payment
    // =========================

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "initiated",
        "success",
        "failed",
      ],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: [
        "razorpay",
        "upi",
        "card",
        "netbanking",
        "other",
      ],
      default: null,
    },

    transactionId: {
      type: String,
      trim: true,
      default: null,
    },

    paymentOrderId: {
      type: String,
      trim: true,
      default: null,
    },

    // =========================
    // Voucher
    // =========================

    voucherGenerated: {
      type: Boolean,
      default: false,
    },

    voucherUrl: {
      type: String,
      trim: true,
      default: null,
    },

    // =========================
    // WhatsApp Message Tracking
    // =========================

    lastMessageId: {
      type: String,
      trim: true,
      default: null,
    },

    lastMessageAt: {
      type: Date,
      default: null,
    },

    // =========================
    // Session Expiry
    // =========================

    expiresAt: {
      type: Date,
      default: () =>
        new Date(
          Date.now() + 30 * 60 * 1000
        ),
    },
  },
  {
    timestamps: true,
  }
);

// =========================
// Auto Delete Expired Sessions
// =========================

whatsappSessionSchema.index(
  { expiresAt: 1 },
  {
    expireAfterSeconds: 0,
  }
);

const WhatsAppSession =
  mongoose.model(
    "WhatsAppSession",
    whatsappSessionSchema
  );

export default WhatsAppSession;