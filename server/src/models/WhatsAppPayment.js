import mongoose from "mongoose";

const whatsappPaymentSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      index: true,
    },

    referenceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    paymentLinkId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    paymentLinkUrl: {
      type: String,
      default: null,
    },

    customerName: {
      type: String,
      default: null,
    },

    customerContact: {
      type: String,
      default: null,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
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

    status: {
      type: String,
      enum: [
        "pending",
        "initiated",
        "success",
        "failed",
        "expired",
      ],
      default: "pending",
      index: true,
    },

    transactionId: {
      type: String,
      default: null,
      index: true,
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
      index: true,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    sessionSnapshot: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    voucherGenerated: {
  type: Boolean,
  default: false,
},

voucherFileName: {
  type: String,
  default: null,
},

voucherMediaId: {
  type: String,
  default: null,
},

voucherSentAt: {
  type: Date,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "WhatsAppPayment",
  whatsappPaymentSchema
);