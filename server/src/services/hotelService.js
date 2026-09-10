import Hotel from "../models/Hotel.js";



// ========================= Create Hotel =========================

export const createHotel = async (hotelData) => {
  const hotel = await Hotel.create(hotelData);

  return hotel;
};



// ========================= Get All Hotels =========================

export const getAllHotels = async () => {
  const hotels = await Hotel.find()
    .populate("owner", "name email phone role")
    .sort({ createdAt: -1 });

  return hotels;
};



// ========================= Get Hotel By ID =========================

export const getHotelById = async (hotelId) => {
  const hotel = await Hotel.findById(hotelId)
    .populate("owner", "name email phone role");

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  return hotel;
};



// ========================= Update Hotel ========================

export const updateHotel = async (hotelId, updateData) => {
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

  const hotel = await Hotel.findByIdAndUpdate(
    hotelId,
    filteredData,
    {
      new: true,
      runValidators: true,
    }
  ).populate("owner", "name email phone role");

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  return hotel;
};



// ========================= Toggle Hotel Status =========================

export const toggleHotelStatus = async (hotelId) => {
  const hotel = await Hotel.findById(hotelId);

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  hotel.isActive = !hotel.isActive;

  await hotel.save();

  return hotel;
};




// ========================= Delete Hotel =========================

export const deleteHotel = async (hotelId) => {
  const hotel = await Hotel.findByIdAndDelete(hotelId);

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  return hotel;
};