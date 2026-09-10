import RoomCategory from "../models/RoomCategory.js";
import Hotel from "../models/Hotel.js";

// =========================
// Create Room Category
// =========================

export const createRoomCategory = async (ownerId, categoryData) => {
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  const { name } = categoryData;

  if (!name || !name.trim()) {
    throw new Error("Room category name is required");
  }

  const existingCategory = await RoomCategory.findOne({
    hotel: hotel._id,
    name: name.trim(),
  });

  if (existingCategory) {
    throw new Error("Room category already exists");
  }

  const category = await RoomCategory.create({
    hotel: hotel._id,
    ...categoryData,
    name: name.trim(),
  });

  return category;
};


// =========================
// Get Owner Room Categories
// =========================

export const getOwnerRoomCategories = async (ownerId) => {
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  const categories = await RoomCategory.find({
    hotel: hotel._id,
    isActive: true,
  }).sort({ name: 1 });

  return {
    hotel,
    categories,
  };
};


// =========================
// Get Single Room Category
// =========================

export const getOwnerRoomCategoryById = async (
  ownerId,
  categoryId
) => {
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  const category = await RoomCategory.findOne({
    _id: categoryId,
    hotel: hotel._id,
  });

  if (!category) {
    throw new Error("Room category not found");
  }

  return category;
};


// =========================
// Update Room Category
// =========================

export const updateOwnerRoomCategory = async (
  ownerId,
  categoryId,
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
    "name",
    "description",
    "maxGuests",
    "bedType",
    "amenities",
    "images",
  ];

  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  if (filteredData.name !== undefined) {
    filteredData.name = filteredData.name.trim();

    if (!filteredData.name) {
      throw new Error("Room category name cannot be empty");
    }
  }

  // Prevent duplicate category name
  if (filteredData.name) {
    const duplicateCategory = await RoomCategory.findOne({
      hotel: hotel._id,
      name: filteredData.name,
      _id: { $ne: categoryId },
    });

    if (duplicateCategory) {
      throw new Error("Room category already exists");
    }
  }

  const category = await RoomCategory.findOneAndUpdate(
    {
      _id: categoryId,
      hotel: hotel._id,
    },
    filteredData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    throw new Error("Room category not found");
  }

  return category;
};

// =========================
// Activate Room Category
// =========================

export const activateRoomCategory = async (
  ownerId,
  categoryId
) => {
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  const category = await RoomCategory.findOneAndUpdate(
    {
      _id: categoryId,
      hotel: hotel._id,
    },
    {
      isActive: true,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    throw new Error("Room category not found");
  }

  return category;
};


// =========================
// Deactivate Room Category
// =========================

export const deactivateRoomCategory = async (
  ownerId,
  categoryId
) => {
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  const category = await RoomCategory.findOneAndUpdate(
    {
      _id: categoryId,
      hotel: hotel._id,
    },
    {
      isActive: false,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    throw new Error("Room category not found");
  }

  return category;
};