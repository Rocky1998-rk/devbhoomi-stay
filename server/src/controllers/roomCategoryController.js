import {
  createRoomCategory,
  getOwnerRoomCategories,
  getOwnerRoomCategoryById,
  updateOwnerRoomCategory,
  deactivateRoomCategory,
  activateRoomCategory,
} from "../services/roomCategoryService.js";

// =========================
// Create Room Category
// =========================

export const createRoomCategoryController = async (req, res) => {
  try {
    const ownerId = req.user.userId;

    const category = await createRoomCategory(
      ownerId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Room category created successfully",
      data: category,
    });
  } catch (error) {
    console.error(
      "Create Room Category Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message:
        error.message || "Failed to create room category",
    });
  }
};


// =========================
// Get Owner Room Categories
// =========================

export const getOwnerRoomCategoriesController = async (
  req,
  res
) => {
  try {
    const ownerId = req.user.userId;

    const result = await getOwnerRoomCategories(ownerId);

    return res.status(200).json({
      success: true,
      message: "Room categories fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(
      "Get Room Categories Error:",
      error.message
    );

    return res.status(404).json({
      success: false,
      message:
        error.message || "Failed to fetch room categories",
    });
  }
};


// =========================
// Get Single Room Category
// =========================

export const getOwnerRoomCategoryController = async (
  req,
  res
) => {
  try {
    const ownerId = req.user.userId;
    const { id } = req.params;

    const category = await getOwnerRoomCategoryById(
      ownerId,
      id
    );

    return res.status(200).json({
      success: true,
      message: "Room category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error(
      "Get Room Category Error:",
      error.message
    );

    return res.status(404).json({
      success: false,
      message:
        error.message || "Room category not found",
    });
  }
};


// =========================
// Update Room Category
// =========================

export const updateOwnerRoomCategoryController = async (
  req,
  res
) => {
  try {
    const ownerId = req.user.userId;
    const { id } = req.params;

    const category = await updateOwnerRoomCategory(
      ownerId,
      id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Room category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error(
      "Update Room Category Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message:
        error.message || "Failed to update room category",
    });
  }
};

// =========================
// Activate Room Category
// =========================

export const activateRoomCategoryController = async (
  req,
  res
) => {
  try {
    const ownerId = req.user.userId;
    const { id } = req.params;

    const category = await activateRoomCategory(
      ownerId,
      id
    );

    return res.status(200).json({
      success: true,
      message: "Room category activated successfully",
      data: category,
    });
  } catch (error) {
    console.error(
      "Activate Room Category Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to activate room category",
    });
  }
};


// =========================
// Deactivate Room Category
// =========================

export const deactivateRoomCategoryController = async (
  req,
  res
) => {
  try {
    const ownerId = req.user.userId;
    const { id } = req.params;

    const category = await deactivateRoomCategory(
      ownerId,
      id
    );

    return res.status(200).json({
      success: true,
      message: "Room category deactivated successfully",
      data: category,
    });
  } catch (error) {
    console.error(
      "Deactivate Room Category Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to deactivate room category",
    });
  }
};