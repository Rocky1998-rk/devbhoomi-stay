import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import RoomCategory from "../models/RoomCategory.js";

/** Create a new room for a hotel */

export const createRoom = async (hotelId, roomData) => {
  // Check whether hotel exists
  const hotel = await Hotel.findById(hotelId);

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  // Prevent duplicate room number inside the same hotel
  const existingRoom = await Room.findOne({
    hotel: hotelId,
    roomNumber: roomData.roomNumber,
  });

  if (existingRoom) {
    throw new Error("Room number already exists in this hotel");
  }

  const room = await Room.create({
    hotel: hotelId,
    roomNumber: roomData.roomNumber,
    roomType: roomData.roomType,
    description: roomData.description,
    maxGuests: roomData.maxGuests,
    pricePerNight: roomData.pricePerNight,
    amenities: roomData.amenities || [],
    images: roomData.images || [],
    isAvailable:
      roomData.isAvailable !== undefined
        ? roomData.isAvailable
        : true,
  });

  return room;
};

/** Get all rooms of a hotel */

export const getHotelRooms = async (hotelId) => {
  const hotel = await Hotel.findById(hotelId);

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  const rooms = await Room.find({ hotel: hotelId }).sort({
    roomNumber: 1,
  });

  return rooms;
};

/** Get single room */

export const getRoomById = async (roomId) => {
  const room = await Room.findById(roomId).populate(
    "hotel",
    "hotelName city state country"
  );

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};

/** Update room */

export const updateRoom = async (roomId, updateData) => {
  const allowedFields = [
    "roomNumber",
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

  // If room number is being changed,
  // make sure duplicate room number doesn't exist

  if (filteredData.roomNumber) {
    const existingRoom = await Room.findOne({
      roomNumber: filteredData.roomNumber,
      _id: { $ne: roomId },
    });

    if (existingRoom) {
      throw new Error("Room number already exists");
    }
  }

  const room = await Room.findByIdAndUpdate(
    roomId,
    filteredData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};


/** Update room availability */

export const updateRoomAvailability = async (roomId, isAvailable) => {
  const room = await Room.findById(roomId);

  if (!room) {
    throw new Error("Room not found");
  }

  // Inactive room cannot be made available
  if (!room.isActive && isAvailable === true) {
    throw new Error("Cannot make an inactive room available");
  }

  room.isAvailable = isAvailable;

  await room.save();

  return room;
};

// ========================= Activate Room =========================

export const activateRoom = async (roomId) => {
  const room = await Room.findByIdAndUpdate(
    roomId,
    { isActive: true },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};

/** Deactivate room */

export const deactivateRoom = async (roomId) => {
  const room = await Room.findByIdAndUpdate(
    roomId,
    {
      isActive: false,
      isAvailable: false,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!room) {
    throw new Error("Room not found");
  }

  return room;

};

// =========================
// Assign Room Category
// =========================

export const assignRoomCategory = async (
  ownerId,
  roomId,
  categoryId
) => {
  // Find owner's active hotel
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  // Check room belongs to owner's hotel
  const room = await Room.findOne({
    _id: roomId,
    hotel: hotel._id,
  });

  if (!room) {
    throw new Error("Room not found for this owner");
  }

  // Check category belongs to same hotel and is active
  const category = await RoomCategory.findOne({
    _id: categoryId,
    hotel: hotel._id,
    isActive: true,
  });

  if (!category) {
    throw new Error(
      "Room category not found or inactive"
    );
  }

  // Assign category to room
  room.roomCategory = category._id;

  await room.save();

  return await Room.findById(room._id)
    .populate("roomCategory");
};