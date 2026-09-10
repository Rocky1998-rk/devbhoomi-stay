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

    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },

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

roomSchema.index(
  { hotel: 1, roomNumber: 1 },
  { unique: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;