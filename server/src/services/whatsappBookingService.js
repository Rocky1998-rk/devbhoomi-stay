import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";

import {
  getApplicableRoomPricing,
} from "./roomPricingService.js";

// =========================
// Escape Regex
// =========================

const escapeRegex = (value) => {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
};

// =========================
// Check Budget
// =========================

const isPriceWithinBudget = (
  price,
  budget
) => {
  if (!budget) {
    return true;
  }

  const { min, max } = budget;

  if (
    min !== null &&
    min !== undefined &&
    price < min
  ) {
    return false;
  }

  if (
    max !== null &&
    max !== undefined &&
    price > max
  ) {
    return false;
  }

  return true;
};

// =========================
// Check Room Availability
// =========================

const isRoomAvailable = async (
  roomId,
  checkIn,
  checkOut
) => {
  const conflictingBooking =
    await Booking.findOne({
      room: roomId,

      status: {
        $in: [
          "pending",
          "confirmed",
        ],
      },

      checkIn: {
        $lt: checkOut,
      },

      checkOut: {
        $gt: checkIn,
      },
    });

  return !conflictingBooking;
};

// =========================
// Search Available Hotels
// =========================

export const searchAvailableHotels =
  async (session) => {
    const {
      destination,
      checkIn,
      checkOut,
      adults,
      children,
      budget,
      hotelType,
    } = session;

    // =========================
    // Validate Search Data
    // =========================

    if (!destination) {
      throw new Error(
        "Destination is required"
      );
    }

    if (!checkIn) {
      throw new Error(
        "Check-in date is required"
      );
    }

    if (!checkOut) {
      throw new Error(
        "Check-out date is required"
      );
    }

    if (!adults) {
      throw new Error(
        "Number of adults is required"
      );
    }

    const startDate =
      new Date(checkIn);

    const endDate =
      new Date(checkOut);

    if (
      Number.isNaN(
        startDate.getTime()
      ) ||
      Number.isNaN(
        endDate.getTime()
      )
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

    const totalGuests =
      Number(adults || 0) +
      Number(children || 0);

    // =========================
    // Find Matching Hotels
    // =========================

    const hotelQuery = {
      isActive: true,

      city: {
        $regex: `^${escapeRegex(
          destination
        )}$`,
        $options: "i",
      },
    };

    // Hotel type filter
    if (hotelType) {
      hotelQuery.hotelType =
        hotelType;
    }

    const hotels =
      await Hotel.find(hotelQuery)
        .sort({
          hotelName: 1,
        });

    const results = [];

    // =========================
    // Check Each Hotel
    // =========================

    for (const hotel of hotels) {
      const rooms =
        await Room.find({
          hotel: hotel._id,

          isActive: true,

          isAvailable: true,
        })
          .populate(
            "roomCategory"
          )
          .sort({
            roomNumber: 1,
          });

      const availableRooms = [];

      // =========================
      // Check Each Room
      // =========================

      for (const room of rooms) {
        const category =
          room.roomCategory;

        if (!category) {
          continue;
        }

        if (
          !category.isActive
        ) {
          continue;
        }

        // Guest capacity
        if (
          category.maxGuests <
          totalGuests
        ) {
          continue;
        }

        // Availability
        const available =
          await isRoomAvailable(
            room._id,
            startDate,
            endDate
          );

        if (!available) {
          continue;
        }

        // =========================
        // Applicable Pricing
        // =========================

        let applicablePricing;

        try {
          applicablePricing =
            await getApplicableRoomPricing(
              hotel.owner,
              room._id,
              startDate
            );
        } catch (error) {
          // No valid pricing for room
          continue;
        }

        if (!applicablePricing) {
          continue;
        }

        const pricePerNight =
          applicablePricing.pricePerNight;

        // Budget filter
        if (
          !isPriceWithinBudget(
            pricePerNight,
            budget
          )
        ) {
          continue;
        }

        availableRooms.push({
          roomId: room._id,

          roomNumber:
            room.roomNumber,

          roomCategory:
            category._id,

          categoryName:
            category.name,

          description:
            category.description,

          maxGuests:
            category.maxGuests,

          bedType:
            category.bedType,

          amenities:
            category.amenities || [],

          images:
            category.images || [],

          pricingType:
            applicablePricing.pricingType,

          pricingName:
            applicablePricing.name,

          pricePerNight,
        });
      }

      // =========================
      // Only Return Hotels
      // Having Available Rooms
      // =========================

      if (
        availableRooms.length === 0
      ) {
        continue;
      }

      const sortedRooms =
        [...availableRooms].sort(
          (a, b) =>
            a.pricePerNight -
            b.pricePerNight
        );

      results.push({
  hotelId: hotel._id,

  hotelName:
    hotel.hotelName,

  description:
    hotel.description,

  hotelType:
    hotel.hotelType,

  city:
    hotel.city,

  state:
    hotel.state,

  country:
    hotel.country,

  address:
    hotel.address,

  phone:
    hotel.phone,

  email:
    hotel.email,

  // ======================================
  // HOTEL MEDIA
  // ======================================

  coverImage:
    hotel.coverImage ||
    hotel.images?.[0] ||
    null,

  images:
    hotel.images || [],

  // ======================================
  // HOTEL LOCATION
  // ======================================

  latitude:
    hotel.latitude ??
    null,

  longitude:
    hotel.longitude ??
    null,

  googleMapsUrl:
    hotel.googleMapsUrl ||
    null,

  // ======================================
  // HOTEL DETAILS
  // ======================================

  amenities:
    hotel.amenities || [],

  checkInTime:
    hotel.checkInTime,

  checkOutTime:
    hotel.checkOutTime,

  startingPrice:
    sortedRooms[0]
      .pricePerNight,

  rooms:
    sortedRooms,
});
    }

    // =========================
    // Sort Hotels By Price
    // =========================

    results.sort(
      (a, b) =>
        a.startingPrice -
        b.startingPrice
    );

    return results;
  };