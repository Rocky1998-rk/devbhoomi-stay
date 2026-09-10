import {
  getOwnerRooms,
  getOwnerRoomById,
  updateOwnerRoom,
  updateOwnerRoomAvailability,
} from "../services/ownerRoomService.js";


// =========================
// Get Owner's All Rooms
// =========================

export const getOwnerRoomsController = async (req, res) => {
  try {
    const ownerId = req.user.userId;

    const result = await getOwnerRooms(ownerId);

    return res.status(200).json({
      success: true,
      message: "Owner rooms fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Get Owner Rooms Error:", error.message);

    return res.status(404).json({
      success: false,
      message: error.message || "Failed to fetch owner rooms",
    });
  }
};


// =========================
// Get Owner Single Room
// =========================

export const getOwnerRoomController = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const { id } = req.params;

    const room = await getOwnerRoomById(ownerId, id);

    return res.status(200).json({
      success: true,
      message: "Room fetched successfully",
      data: room,
    });
  } catch (error) {
  console.error("Get Owner Room Error:", error.message);

  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid room ID",
    });
  }

  return res.status(404).json({
    success: false,
    message: error.message || "Room not found",
  });
}
};


// =========================
// Update Owner Room
// =========================

export const updateOwnerRoomController = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const { id } = req.params;

    const room = await updateOwnerRoom(
      ownerId,
      id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: room,
    });
  } catch (error) {
    console.error("Update Owner Room Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update room",
    });
  }
};


// =========================
// Update Owner Room Availability
// =========================

export const updateOwnerRoomAvailabilityController = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const { id } = req.params;
    const { isAvailable } = req.body;

    const room = await updateOwnerRoomAvailability(
      ownerId,
      id,
      isAvailable
    );

    return res.status(200).json({
      success: true,
      message: "Room availability updated successfully",
      data: room,
    });
  } catch (error) {
    console.error(
      "Update Owner Room Availability Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update room availability",
    });
  }
};