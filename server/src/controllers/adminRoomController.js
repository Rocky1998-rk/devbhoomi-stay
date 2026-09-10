import {createRoom,getHotelRooms,getRoomById,updateRoom,updateRoomAvailability,activateRoom,deactivateRoom,assignRoomCategory,} from "../services/adminRoomService.js";


// ========================= Create Room =========================

export const createRoomController = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const room = await createRoom(hotelId, req.body);

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });

  } catch (error) {
    console.error("Create Room Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create room",
    });
  }
};


// ========================= Get All Rooms of Hotel =========================

export const getRooms = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const rooms = await getHotelRooms(hotelId);

    return res.status(200).json({
      success: true,
      message: "Rooms fetched successfully",
      data: rooms,
    });

  } catch (error) {
    console.error("Get Rooms Error:", error.message);

    return res.status(404).json({
      success: false,
      message: error.message || "Failed to fetch rooms",
    });
  }
};


// ========================= Get Single Room =========================

export const getRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await getRoomById(id);

    return res.status(200).json({
      success: true,
      message: "Room fetched successfully",
      data: room,
    });

  } catch (error) {
    console.error("Get Room Error:", error.message);

    return res.status(404).json({
      success: false,
      message: error.message || "Room not found",
    });
  }
};


// ========================= Update Room =========================

export const updateRoomController = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await updateRoom(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: room,
    });

  } catch (error) {
    console.error("Update Room Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update room",
    });
  }
};


// ========================= Update Room Availability =========================

export const updateRoomAvailabilityController = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    if (typeof isAvailable !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isAvailable must be a boolean value",
      });
    }

    const room = await updateRoomAvailability(
      id,
      isAvailable
    );

    return res.status(200).json({
      success: true,
      message: `Room ${
        isAvailable ? "available" : "unavailable"
      } successfully`,
      data: room,
    });

  } catch (error) {
    console.error(
      "Update Room Availability Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update room availability",
    });
  }
};



// ========================= Activate Room =========================  

export const activateRoomController = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await activateRoom(id);

    return res.status(200).json({
      success: true,
      message: "Room activated successfully",
      data: room,
    });
  } catch (error) {
    console.error("Activate Room Error:", error.message);

    return res.status(404).json({
      success: false,
      message: error.message || "Room not found",
    });
  }
};


// ========================= Deactivate Room =========================

export const deactivateRoomController = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await deactivateRoom(id);

    return res.status(200).json({
      success: true,
      message: "Room deactivated successfully",
      data: room,
    });

  } catch (error) {
    console.error("Deactivate Room Error:", error.message);

    return res.status(404).json({
      success: false,
      message: error.message || "Room not found",
    });
  }
};

// =========================
// Assign Room Category
// =========================

export const assignRoomCategoryController = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const { id } = req.params;
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "categoryId is required",
      });
    }

    const room = await assignRoomCategory(
      ownerId,
      id,
      categoryId
    );

    return res.status(200).json({
      success: true,
      message: "Room category assigned successfully",
      data: room,
    });
  } catch (error) {
    console.error(
      "Assign Room Category Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message:
        error.message || "Failed to assign room category",
    });
  }
};