import {
  createRoomPricing,
  getRoomPricing,
  deactivateRoomPricing,
  activateRoomPricing,
  updateRoomPricing,
  getApplicableRoomPricing,
} from "../services/roomPricingService.js";


// ========================= nCreate Room Pricing =========================

export const createRoomPricingController = async (
  req,
  res
) => {
  try {
    const ownerId = req.user.userId;
    const { roomId } = req.params;

    const pricing = await createRoomPricing(
      ownerId,
      roomId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Room pricing created successfully",
      data: pricing,
    });
  } catch (error) {
    console.error(
      "Create Room Pricing Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to create room pricing",
    });
  }
};


// ========================= Get Room Pricing =========================

export const getRoomPricingController = async (
  req,
  res
) => {
  try {
    const ownerId = req.user.userId;
    const { roomId } = req.params;

    const pricing = await getRoomPricing(
      ownerId,
      roomId
    );

    return res.status(200).json({
      success: true,
      message: "Room pricing fetched successfully",
      data: pricing,
    });
  } catch (error) {
    console.error(
      "Get Room Pricing Error:",
      error.message
    );

    return res.status(404).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch room pricing",
    });
  }
};


// ========================= Activate Room Pricing =========================

export const activateRoomPricingController = async ( req, res) => {
  try {
    const ownerId = req.user.userId;
    const { id } = req.params;

    const pricing = await activateRoomPricing(
      ownerId,
      id
    );

    return res.status(200).json({
      success: true,
      message: "Room pricing activated successfully",
      data: pricing,
    });
  } catch (error) {
    console.error(
      "Activate Room Pricing Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to activate room pricing",
    });
  }
};


// ========================= Deactivate Room Pricing =========================

export const deactivateRoomPricingController = async (
  req,
  res
) => {
  try {
    const ownerId = req.user.userId;
    const { id } = req.params;

    const pricing = await deactivateRoomPricing(
      ownerId,
      id
    );

    return res.status(200).json({
      success: true,
      message: "Room pricing deactivated successfully",
      data: pricing,
    });
  } catch (error) {
    console.error(
      "Deactivate Room Pricing Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to deactivate room pricing",
    });
  }
};

// ========================= Update Room Pricing =========================

export const updateRoomPricingController = async (
  req,
  res
) => {
  try {
    const ownerId = req.user.userId;
    const { id } = req.params;

    const pricing = await updateRoomPricing(
      ownerId,
      id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Room pricing updated successfully",
      data: pricing,
    });
  } catch (error) {
    console.error(
      "Update Room Pricing Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to update room pricing",
    });
  }
};




// ========================= Get Applicable Room Pricing =========================

export const getApplicableRoomPricingController = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const { roomId } = req.params;
    const { bookingDate } = req.query;

    const pricing = await getApplicableRoomPricing(
      ownerId,
      roomId,
      bookingDate
    );

    return res.status(200).json({
      success: true,
      message: "Applicable room pricing fetched successfully",
      data: pricing,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};