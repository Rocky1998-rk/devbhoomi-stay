import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true,
    },

    roomCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomCategory",
      required: false,
      index: true,
    },

    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },

    // Operational / manual availability
    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },

    // Room active/inactive status
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    // Temporary lock used while creating a booking
    bookingLock: {
      type: Boolean,
      default: false,
      index: true,
    },

    bookingLockAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

roomSchema.index(
  { hotel: 1, roomNumber: 1 },
  { unique: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;