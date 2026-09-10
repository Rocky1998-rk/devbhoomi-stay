import Hotel from "../models/Hotel.js";


// ========================= Get Owner's Hotel =========================

export const getOwnerHotel = async (ownerId) => {
  const hotel = await Hotel.findOne({
    owner: ownerId,
  }).populate("owner", "name email phone role");

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  return hotel;
};


// ========================= Update Owner's Hotel =========================

export const updateOwnerHotel = async (ownerId, updateData) => {
  const allowedFields = [
    "hotelName",
    "description",
    "phone",
    "email",
    "address",
    "city",
    "state",
    "country",
    "images",
    "amenities",
    "checkInTime",
    "checkOutTime",
  ];

  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  const hotel = await Hotel.findOneAndUpdate(
    { owner: ownerId },
    filteredData,
    {
      new: true,
      runValidators: true,
    }
  ).populate("owner", "name email phone role");

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  return hotel;
};