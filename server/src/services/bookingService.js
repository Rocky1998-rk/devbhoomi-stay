import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

import {
  getApplicableRoomPricing,
} from "./roomPricingService.js";

// Temporary booking lock timeout
const BOOKING_LOCK_TIMEOUT_MS =
  2 * 60 * 1000;

// =========================
// Create Booking
// =========================

export const createBooking = async (
  ownerId,
  bookingData
) => {
  const {
    hotelId,
    roomId,
    guestName,
    guestPhone,
    guestEmail,
    checkIn,
    checkOut,
  } = bookingData;

  // =========================
  // Required Fields
  // =========================

  if (
    !roomId ||
    !guestName ||
    !guestPhone ||
    !checkIn ||
    !checkOut
  ) {
    throw new Error(
      "Room, guest name, guest phone, check-in and check-out are required"
    );
  }

  // =========================
  // Find Hotel
  // =========================

  let hotel;

  // WhatsApp / Direct Hotel Flow
  if (hotelId) {
    hotel = await Hotel.findOne({
      _id: hotelId,
      isActive: true,
    });
  }

  // Existing Owner Flow
  else {
    if (!ownerId) {
      throw new Error(
        "Owner or hotel is required"
      );
    }

    hotel = await Hotel.findOne({
      owner: ownerId,
      isActive: true,
    });
  }

  if (!hotel) {
    throw new Error(
      "Hotel not found"
    );
  }

  // =========================
  // Validate Owner Access
  // =========================

  if (
    ownerId &&
    hotel.owner &&
    String(hotel.owner) !==
      String(ownerId)
  ) {
    throw new Error(
      "You are not authorized to create booking for this hotel"
    );
  }

  // =========================
  // Resolve Pricing Owner
  // =========================

  const pricingOwnerId =
    hotel.owner || ownerId;

  if (!pricingOwnerId) {
    throw new Error(
      "Hotel owner not found"
    );
  }

  // =========================
  // Check Room Ownership
  // =========================

  const room = await Room.findOne({
    _id: roomId,
    hotel: hotel._id,
    isActive: true,
  }).populate("roomCategory");

  if (!room) {
    throw new Error(
      "Room not found for this hotel"
    );
  }

  // =========================
  // Check Room Category
  // =========================

  if (!room.roomCategory) {
    throw new Error(
      "Room category is not assigned to this room"
    );
  }

  // =========================
  // Check Operational Availability
  // =========================

  if (!room.isAvailable) {
    throw new Error(
      "Room is currently unavailable"
    );
  }

  // =========================
  // Validate Dates
  // =========================

  const startDate =
    new Date(checkIn);

  const endDate =
    new Date(checkOut);

  if (
    isNaN(startDate.getTime()) ||
    isNaN(endDate.getTime())
  ) {
    throw new Error(
      "Invalid booking dates"
    );
  }

  if (endDate <= startDate) {
    throw new Error(
      "Check-out date must be after check-in date"
    );
  }

  // =========================
  // Calculate Total Nights
  // =========================

  const millisecondsPerDay =
    1000 *
    60 *
    60 *
    24;

  const totalNights =
    Math.ceil(
      (endDate - startDate) /
        millisecondsPerDay
    );

  if (totalNights < 1) {
    throw new Error(
      "Booking must be for at least one night"
    );
  }

  // =====================================================
  // Acquire Atomic Room Booking Lock
  // =====================================================

  const staleLockBefore =
    new Date(
      Date.now() -
        BOOKING_LOCK_TIMEOUT_MS
    );

  const lockStartedAt =
    new Date();

  const lockedRoom =
    await Room.findOneAndUpdate(
      {
        _id: room._id,
        isActive: true,
        isAvailable: true,

        $or: [
          {
            bookingLock: false,
          },
          {
            bookingLockAt: null,
          },
          {
            bookingLockAt: {
              $lt: staleLockBefore,
            },
          },
        ],
      },
      {
        $set: {
          bookingLock: true,
          bookingLockAt:
            lockStartedAt,
        },
      },
      {
        new: true,
      }
    );

  if (!lockedRoom) {
    throw new Error(
      "Room is currently being booked. Please try again in a moment"
    );
  }

  try {
    // =========================
    // Check Room Availability
    // =========================

    const conflictingBooking =
      await Booking.findOne({
        room: room._id,

        status: {
          $in: [
            "pending",
            "confirmed",
          ],
        },

        checkIn: {
          $lt: endDate,
        },

        checkOut: {
          $gt: startDate,
        },
      });

    if (conflictingBooking) {
      throw new Error(
        "Room is already booked for the selected dates"
      );
    }

    // =========================
    // Get Applicable Pricing
    // =========================

    const applicablePricing =
      await getApplicableRoomPricing(
        pricingOwnerId,
        room._id,
        startDate
      );

    // =========================
    // Calculate Total Room Price
    // =========================

    const pricePerNight =
      applicablePricing.pricePerNight;

    const totalRoomPrice =
      pricePerNight *
      totalNights;

    // =========================
    // Create Pricing Breakdown
    // =========================

    const pricingBreakdown = [];

    for (
      let i = 0;
      i < totalNights;
      i++
    ) {
      const nightDate =
        new Date(startDate);

      nightDate.setDate(
        nightDate.getDate() + i
      );

      pricingBreakdown.push({
        date: nightDate,

        pricingType:
          applicablePricing.pricingType,

        pricingName:
          applicablePricing.name,

        pricePerNight,
      });
    }

    // =========================
    // Create Booking
    // =========================

    const booking =
      await Booking.create({
        hotel: hotel._id,

        room: room._id,

        roomCategory:
          room.roomCategory._id,

        guestName:
          guestName.trim(),

        guestPhone:
          guestPhone.trim(),

        guestEmail:
          guestEmail
            ? guestEmail
                .trim()
                .toLowerCase()
            : undefined,

        checkIn: startDate,

        checkOut: endDate,

        totalNights,

        // =========================
        // Pricing Snapshot
        // =========================

        pricingType:
          applicablePricing.pricingType,

        pricingName:
          applicablePricing.name,

        pricePerNight,

        totalRoomPrice,

        pricingBreakdown,

        status: "pending",
      });

    console.log(
      "✅ Booking created:",
      booking._id
    );

    return booking;

  } finally {
    // =====================================================
    // Release Only Our Own Lock
    // =====================================================

    await Room.updateOne(
      {
        _id: room._id,

        bookingLock: true,

        bookingLockAt:
          lockStartedAt,
      },
      {
        $set: {
          bookingLock: false,

          bookingLockAt: null,
        },
      }
    );
  }
};

// =========================
// Get Owner Bookings
// =========================

export const getOwnerBookings =
  async (ownerId) => {
    const hotel =
      await Hotel.findOne({
        owner: ownerId,
        isActive: true,
      });

    if (!hotel) {
      throw new Error(
        "Hotel not found for this owner"
      );
    }

    const bookings =
      await Booking.find({
        hotel: hotel._id,
      })
        .populate(
          "room",
          "roomNumber"
        )
        .populate(
          "roomCategory",
          "name"
        )
        .sort({
          createdAt: -1,
        });

    return bookings;
  };

// =========================
// Get Single Owner Booking
// =========================

export const getOwnerBookingById =
  async (
    ownerId,
    bookingId
  ) => {
    const hotel =
      await Hotel.findOne({
        owner: ownerId,
        isActive: true,
      });

    if (!hotel) {
      throw new Error(
        "Hotel not found for this owner"
      );
    }

    const booking =
      await Booking.findOne({
        _id: bookingId,
        hotel: hotel._id,
      })
        .populate(
          "room",
          "roomNumber"
        )
        .populate(
          "roomCategory",
          "name"
        );

    if (!booking) {
      throw new Error(
        "Booking not found"
      );
    }

    return booking;
  };

// =========================
// Update Booking Status
// =========================

export const updateBookingStatus =
  async (
    ownerId,
    bookingId,
    newStatus
  ) => {
    const hotel =
      await Hotel.findOne({
        owner: ownerId,
        isActive: true,
      });

    if (!hotel) {
      throw new Error(
        "Hotel not found for this owner"
      );
    }

    const allowedStatuses = [
      "pending",
      "confirmed",
      "cancelled",
      "completed",
    ];

    if (
      !allowedStatuses.includes(
        newStatus
      )
    ) {
      throw new Error(
        "Invalid booking status"
      );
    }

    const booking =
      await Booking.findOne({
        _id: bookingId,
        hotel: hotel._id,
      });

    if (!booking) {
      throw new Error(
        "Booking not found"
      );
    }

    const allowedTransitions = {
      pending: [
        "confirmed",
        "cancelled",
      ],

      confirmed: [
        "completed",
        "cancelled",
      ],

      cancelled: [],

      completed: [],
    };

    if (
      booking.status ===
      newStatus
    ) {
      throw new Error(
        `Booking is already ${newStatus}`
      );
    }

    if (
      !allowedTransitions[
        booking.status
      ].includes(newStatus)
    ) {
      throw new Error(
        `Booking cannot be changed from ${booking.status} to ${newStatus}`
      );
    }

    booking.status =
      newStatus;

    await booking.save();

    return booking;
  };