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

// ========================= Create Owner's Hotel =========================

export const createOwnerHotel = async (ownerId, hotelData) => {
  // Check if owner already has a registered hotel
  const existingHotel = await Hotel.findOne({ owner: ownerId });
  if (existingHotel) {
    throw new Error(
      "Hotel already registered for this account. Please update your existing hotel profile."
    );
  }

  const hotelName = hotelData.hotelName || hotelData.name;
  if (!hotelName) {
    throw new Error("Hotel name is required");
  }

  const phone = hotelData.phone;
  if (!phone) {
    throw new Error("Contact phone is required");
  }

  const address = hotelData.address;
  if (!address) {
    throw new Error("Hotel address is required");
  }

  const city = hotelData.city;
  if (!city) {
    throw new Error("City is required");
  }

  const hotelPayload = {
    owner: ownerId,
    hotelName: hotelName.trim(),
    hotelType: hotelData.hotelType || "Boutique Hotel",
    description: hotelData.description || "",
    phone: phone.trim(),
    email: hotelData.email ? hotelData.email.trim().toLowerCase() : "",
    website: hotelData.website || "",
    address: address.trim(),
    city: city.trim(),
    state: hotelData.state || "Uttarakhand",
    country: hotelData.country || "India",
    pincode: hotelData.pincode || "246155",
    totalRooms: Number(hotelData.totalRooms) || 12,
    roomCategories: Number(hotelData.roomCategories) || 4,
    guestCapacity: hotelData.guestCapacity || "2 – 6",
    floors: Number(hotelData.floors) || 2,
    rating: Number(hotelData.rating) || 4.6,
    reviewsCount: Number(hotelData.reviewsCount) || 128,
    checkInTime: hotelData.checkInTime || "12:00 PM",
    checkOutTime: hotelData.checkOutTime || "11:00 AM",
    amenities: Array.isArray(hotelData.amenities) ? hotelData.amenities : [],
    images: Array.isArray(hotelData.images) ? hotelData.images : [],
    coverImage:
      hotelData.coverImage ||
      (Array.isArray(hotelData.images) && hotelData.images[0]) ||
      null,
    latitude: hotelData.latitude || null,
    longitude: hotelData.longitude || null,
    googleMapsUrl: hotelData.googleMapsUrl || null,
    policies: hotelData.policies || {
      checkInOutPolicy:
        "Standard check-in starts at 12:00 PM and check-out is by 11:00 AM. Government ID verification is required for all adult guests.",
      cancellationPolicy:
        "Free cancellation up to 48 hours before check-in date. Cancellations within 48 hours forfeit the 25% advance token deposit.",
      quietHoursPolicy:
        "Quiet hours are observed between 10:00 PM – 07:00 AM. Evening bonfires are held in the designated lawn area weather permitting.",
    },
    isActive: hotelData.isActive !== undefined ? hotelData.isActive : true,
  };

  const hotel = await Hotel.create(hotelPayload);
  return hotel;
};

// ========================= Update Owner's Hotel =========================

export const updateOwnerHotel = async (ownerId, updateData) => {
  const allowedFields = [
    "hotelName",
    "name",
    "description",
    "phone",
    "email",
    "website",
    "address",
    "city",
    "state",
    "country",
    "pincode",
    "hotelType",
    "totalRooms",
    "roomCategories",
    "guestCapacity",
    "floors",
    "rating",
    "reviewsCount",
    "images",
    "coverImage",
    "amenities",
    "checkInTime",
    "checkOutTime",
    "policies",
    "latitude",
    "longitude",
    "googleMapsUrl",
    "isActive",
  ];

  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      if (field === "name" && !updateData.hotelName) {
        filteredData["hotelName"] = updateData[field];
      } else if (field !== "name") {
        filteredData[field] = updateData[field];
      }
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
