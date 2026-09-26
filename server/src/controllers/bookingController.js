
import {
  createBooking,
  getOwnerBookings,
  getOwnerBookingById,
  updateBookingStatus,
} from "../services/bookingService.js";

// ========================= Create Booking =========================

export const createBookingController = async (req,res) => {
  try {
    // =========================
    // Get Owner ID
    // =========================

    const ownerId = req.user.userId;

    // =========================
    // Create Booking
    // =========================

    const booking = await createBooking(
      ownerId,
      req.body
    );

    // =========================
    // Success Response
    // =========================

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    // =========================
    // Error Response
    // =========================

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= Get Owner Bookings =========================
export const getOwnerBookingsController = async ( req,res) => {
  try {
    const ownerId = req.user.userId;

    const bookings = await getOwnerBookings(
      ownerId
    );

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================= Get Single Owner Booking =========================
export const getOwnerBookingByIdController = async (
  req,
  res
) => {
  try {
    const ownerId = req.user.userId;
    const { bookingId } = req.params;

    const booking = await getOwnerBookingById(
      ownerId,
      bookingId
    );

    return res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= Update Booking Status =========================
export const updateBookingStatusController = async (req,res) => {
  try {
    const ownerId = req.user.userId;
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Booking status is required",
      });
    }

    const booking = await updateBookingStatus(
      ownerId,
      bookingId,
      status
    );

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};