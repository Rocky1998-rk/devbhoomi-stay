import {createHotel,getAllHotels,getHotelById,updateHotel,toggleHotelStatus,deleteHotel,} from "../services/hotelService.js";



// ========================= Create Hotel =========================

export const createHotelController = async (req, res) => {
  try {
    const hotelData = req.body;

    const hotel = await createHotel(hotelData);

    return res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      data: hotel,
    });

  } catch (error) {
    console.error("Create Hotel Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create hotel",
    });
  }
};


// ========================= Get All Hotels =========================

export const getHotels = async (req, res) => {
  try {
    const hotels = await getAllHotels();

    return res.status(200).json({
      success: true,
      message: "Hotels fetched successfully",
      data: hotels,
    });

  } catch (error) {
    console.error("Get Hotels Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch hotels",
    });
  }
};


// ========================= Get Single Hotel =========================

export const getHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await getHotelById(id);

    return res.status(200).json({
      success: true,
      message: "Hotel fetched successfully",
      data: hotel,
    });

  } catch (error) {
    console.error("Get Hotel Error:", error.message);

    return res.status(404).json({
      success: false,
      message: error.message || "Hotel not found",
    });
  }
};


// ========================= Update Hotel =========================

export const updateHotelController = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await updateHotel(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });

  } catch (error) {
    console.error("Update Hotel Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update hotel",
    });
  }
};



// ========================= Toggle Hotel Status =========================

export const toggleHotelStatusController = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await toggleHotelStatus(id);

    return res.status(200).json({
      success: true,
      message: `Hotel ${
        hotel.isActive ? "activated" : "deactivated"
      } successfully`,
      data: hotel,
    });

  } catch (error) {
    console.error("Toggle Hotel Status Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update hotel status",
    });
  }
};



// ========================= Delete Hotel =========================

export const deleteHotelController = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteHotel(id);

    return res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
    });

  } catch (error) {
    console.error("Delete Hotel Error:", error.message);

    return res.status(404).json({
      success: false,
      message: error.message || "Hotel not found",
    });
  }
};