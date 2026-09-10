import { getOwnerHotel, updateOwnerHotel, } from "../services/ownerHotelService.js";


// ========================= Get Owner's Hotel =========================

export const getMyHotel = async (req, res) => {
  try {
    // authMiddleware se req.user me authenticated user available hai
    const ownerId = req.user.userId;

    const hotel = await getOwnerHotel(ownerId);

    return res.status(200).json({
      success: true,
      message: "Hotel fetched successfully",
      data: hotel,
    });

  } catch (error) {
    console.error("Get Owner Hotel Error:", error.message);

    return res.status(404).json({
      success: false,
      message: error.message || "Hotel not found",
    });
  }
};


// ========================= Update Owner's Hotel =========================

export const updateMyHotel = async (req, res) => {
  try {
    const ownerId = req.user.userId;

    const hotel = await updateOwnerHotel(
      ownerId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });

  } catch (error) {
    console.error("Update Owner Hotel Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update hotel",
    });
  }
};