import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

/** =========== Get all rooms of logged-in owner's hotel =========== */ 
export const getOwnerRooms = async (ownerId) => {const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  const rooms = await Room.find({
    hotel: hotel._id,
  }).sort({ roomNumber: 1 });

  return {
    hotel,
    rooms,
  };
};

/** =========== Get single room of logged-in owner's hotel =========== */

export const getOwnerRoomById = async (ownerId, roomId) => {
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  const room = await Room.findOne({
    _id: roomId,
    hotel: hotel._id,
  });

  if (!room) {
    throw new Error("Room not found or access denied");
  }

  return room;
};

/** =========== Update room of logged-in owner's hotel =========== */
export const updateOwnerRoom = async (
  ownerId,
  roomId,
  updateData
) => {
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  const allowedFields = [
    "roomType",
    "description",
    "maxGuests",
    "pricePerNight",
    "amenities",
    "images",
    "isAvailable",
  ];

  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  const room = await Room.findOneAndUpdate(
    {
      _id: roomId,
      hotel: hotel._id,
    },
    filteredData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!room) {
    throw new Error("Room not found or access denied");
  }

  return room;
};


// ========================= Update Owner Room Availability =========================

export const updateOwnerRoomAvailability = async (
  ownerId,
  roomId,
  isAvailable
) => {
  // Validate availability value
  if (typeof isAvailable !== "boolean") {
    throw new Error("isAvailable must be true or false");
  }

  // Find owner's active hotel
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  // Find room belonging to this owner's hotel
  const room = await Room.findOne({
    _id: roomId,
    hotel: hotel._id,
    isActive: true,
  });

  if (!room) {
    throw new Error("Room not found or room is inactive");
  }

  // Update availability
  room.isAvailable = isAvailable;

  await room.save();

  return room;
};