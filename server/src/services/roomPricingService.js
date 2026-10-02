import RoomPricing from "../models/RoomPricing.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// =========================
// Get Owner's Hotel By Room
// =========================

const getOwnedHotelByRoom = async (
  ownerId,
  roomId
) => {
  // ======================================
  // Find Room
  // ======================================

  const room = await Room.findOne({
    _id: roomId,
    isActive: true,
  });

  if (!room) {
    throw new Error(
      "Room not found"
    );
  }

  // ======================================
  // Find Hotel Belonging To Owner
  // ======================================

  const hotel = await Hotel.findOne({
    _id: room.hotel,
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error(
      "Room not found for this owner"
    );
  }

  return {
    room,
    hotel,
  };
};

// =========================
// Find Owner's Hotel By Pricing
// =========================

const getOwnedHotelByPricing =
  async (
    ownerId,
    pricingId
  ) => {
    // ======================================
    // Find Pricing
    // ======================================

    const pricing =
      await RoomPricing.findOne({
        _id: pricingId,
      });

    if (!pricing) {
      throw new Error(
        "Room pricing not found"
      );
    }

    // ======================================
    // Verify Hotel Ownership
    // ======================================

    const hotel =
      await Hotel.findOne({
        _id: pricing.hotel,
        owner: ownerId,
        isActive: true,
      });

    if (!hotel) {
      throw new Error(
        "Room pricing not found for this owner"
      );
    }

    return {
      pricing,
      hotel,
    };
  };

// =========================
// Create Room Pricing
// =========================

export const createRoomPricing =
  async (
    ownerId,
    roomId,
    pricingData
  ) => {
    // ======================================
    // Find Correct Hotel Through Room
    // ======================================

    const {
      room,
      hotel,
    } = await getOwnedHotelByRoom(
      ownerId,
      roomId
    );

    // =========================
    // Get Pricing Data
    // =========================

    const {
      pricingType,
      name,
      startDate,
      endDate,
      pricePerNight,
    } = pricingData;

    // =========================
    // Required Fields
    // =========================

    if (
      !pricingType ||
      !name ||
      !startDate ||
      !endDate ||
      pricePerNight ===
        undefined
    ) {
      throw new Error(
        "Pricing type, name, dates and price are required"
      );
    }

    // =========================
    // Validate Pricing Type
    // =========================

    if (
      ![
        "normal",
        "season",
        "blackout",
      ].includes(pricingType)
    ) {
      throw new Error(
        "Invalid pricing type"
      );
    }

    // =========================
    // Validate Dates
    // =========================

    const start =
      new Date(startDate);

    const end =
      new Date(endDate);

    if (
      isNaN(start.getTime()) ||
      isNaN(end.getTime())
    ) {
      throw new Error(
        "Invalid pricing dates"
      );
    }

    if (end < start) {
      throw new Error(
        "End date cannot be before start date"
      );
    }

    // =========================
    // Validate Price
    // =========================

    if (
      typeof pricePerNight !==
        "number" ||
      pricePerNight < 0
    ) {
      throw new Error(
        "Price per night cannot be negative"
      );
    }

    // =========================
    // Automatic Priority
    // =========================

    let priority;

    if (
      pricingType ===
      "normal"
    ) {
      priority = 1;
    }

    if (
      pricingType ===
      "season"
    ) {
      priority = 2;
    }

    if (
      pricingType ===
      "blackout"
    ) {
      priority = 3;
    }

    // =========================
    // Same-Type Overlap Check
    // =========================

    const overlappingPricing =
      await RoomPricing.findOne({
        room: room._id,
        pricingType,
        isActive: true,

        startDate: {
          $lte: end,
        },

        endDate: {
          $gte: start,
        },
      });

    if (overlappingPricing) {
      throw new Error(
        `Overlapping ${pricingType} pricing already exists for this date range`
      );
    }

    // =========================
    // Create Pricing
    // =========================

    const pricing =
      await RoomPricing.create({
        room: room._id,

        hotel:
          hotel._id,

        pricingType,

        name:
          name.trim(),

        startDate:
          start,

        endDate:
          end,

        pricePerNight,

        priority,

        isActive: true,
      });

    return pricing;
  };

// =========================
// Get Room Pricing
// =========================

export const getRoomPricing =
  async (
    ownerId,
    roomId
  ) => {
    // ======================================
    // Find Correct Hotel Through Room
    // ======================================

    const {
      room,
      hotel,
    } = await getOwnedHotelByRoom(
      ownerId,
      roomId
    );

    // ======================================
    // Get Active Pricing
    // ======================================

    const pricing =
      await RoomPricing.find({
        room: room._id,
        hotel: hotel._id,
        isActive: true,
      }).sort({
        priority: -1,
        startDate: 1,
      });

    return pricing;
  };

// =========================
// Activate Room Pricing
// =========================

export const activateRoomPricing =
  async (
    ownerId,
    pricingId
  ) => {
    const {
      pricing,
    } =
      await getOwnedHotelByPricing(
        ownerId,
        pricingId
      );

    // ======================================
    // Ensure Currently Inactive
    // ======================================

    if (pricing.isActive) {
      throw new Error(
        "Room pricing not found or already active"
      );
    }

    // ======================================
    // Activate Pricing
    // ======================================

    pricing.isActive =
      true;

    await pricing.save();

    return pricing;
  };

// =========================
// Deactivate Room Pricing
// =========================

export const deactivateRoomPricing =
  async (
    ownerId,
    pricingId
  ) => {
    const {
      pricing,
    } =
      await getOwnedHotelByPricing(
        ownerId,
        pricingId
      );

    // ======================================
    // Ensure Currently Active
    // ======================================

    if (!pricing.isActive) {
      throw new Error(
        "Room pricing not found or already inactive"
      );
    }

    // ======================================
    // Deactivate Pricing
    // ======================================

    pricing.isActive =
      false;

    await pricing.save();

    return pricing;
  };

// =========================
// Update Room Pricing
// =========================

export const updateRoomPricing =
  async (
    ownerId,
    pricingId,
    pricingData
  ) => {
    const {
      pricing,
      hotel,
    } =
      await getOwnedHotelByPricing(
        ownerId,
        pricingId
      );

    const {
      pricingType,
      name,
      startDate,
      endDate,
      pricePerNight,
      priority,
    } = pricingData;

    // =========================
    // Validate Pricing Type
    // =========================

    if (
      pricingType !==
        undefined &&
      ![
        "normal",
        "season",
        "blackout",
      ].includes(
        pricingType
      )
    ) {
      throw new Error(
        "Invalid pricing type"
      );
    }

    // =========================
    // Final Values
    // =========================

    const finalPricingType =
      pricingType !==
      undefined
        ? pricingType
        : pricing.pricingType;

    const finalName =
      name !== undefined
        ? name
        : pricing.name;

    const finalStartDate =
      startDate !== undefined
        ? new Date(startDate)
        : pricing.startDate;

    const finalEndDate =
      endDate !== undefined
        ? new Date(endDate)
        : pricing.endDate;

    const finalPrice =
      pricePerNight !==
      undefined
        ? pricePerNight
        : pricing.pricePerNight;

    const finalPriority =
      priority !== undefined
        ? priority
        : pricing.priority;

    // =========================
    // Validate Dates
    // =========================

    if (
      isNaN(
        finalStartDate.getTime()
      ) ||
      isNaN(
        finalEndDate.getTime()
      )
    ) {
      throw new Error(
        "Invalid pricing dates"
      );
    }

    if (
      finalEndDate <
      finalStartDate
    ) {
      throw new Error(
        "End date cannot be before start date"
      );
    }

    // =========================
    // Validate Price
    // =========================

    if (
      finalPrice < 0
    ) {
      throw new Error(
        "Price per night cannot be negative"
      );
    }

    // =========================
    // Validate Priority
    // =========================

    if (
      finalPriority < 1
    ) {
      throw new Error(
        "Priority must be at least 1"
      );
    }

    // =========================
    // Same-Type Overlap Check
    // =========================

    const overlappingPricing =
      await RoomPricing.findOne({
        _id: {
          $ne:
            pricing._id,
        },

        room:
          pricing.room,

        hotel:
          hotel._id,

        pricingType:
          finalPricingType,

        isActive: true,

        startDate: {
          $lte:
            finalEndDate,
        },

        endDate: {
          $gte:
            finalStartDate,
        },
      });

    if (overlappingPricing) {
      throw new Error(
        `Overlapping ${finalPricingType} pricing already exists for this date range`
      );
    }

    // =========================
    // Update Pricing
    // =========================

    pricing.pricingType =
      finalPricingType;

    pricing.name =
      finalName;

    pricing.startDate =
      finalStartDate;

    pricing.endDate =
      finalEndDate;

    pricing.pricePerNight =
      finalPrice;

    pricing.priority =
      finalPriority;

    await pricing.save();

    return pricing;
  };

// =========================
// Get Applicable Room Pricing
// =========================

export const getApplicableRoomPricing =
  async (
    ownerId,
    roomId,
    bookingDate
  ) => {
    // ======================================
    // Find Correct Hotel Through Room
    // ======================================

    const {
      room,
      hotel,
    } = await getOwnedHotelByRoom(
      ownerId,
      roomId
    );

    // =========================
    // Validate Booking Date
    // =========================

    const date =
      new Date(
        bookingDate
      );

    if (
      isNaN(
        date.getTime()
      )
    ) {
      throw new Error(
        "Invalid booking date"
      );
    }

    // =========================
    // Find Applicable Pricing
    // =========================

    const applicablePricing =
      await RoomPricing.find({
        room: room._id,

        hotel:
          hotel._id,

        isActive: true,

        startDate: {
          $lte: date,
        },

        endDate: {
          $gte: date,
        },
      }).sort({
        priority: -1,
      });

    if (
      !applicablePricing.length
    ) {
      throw new Error(
        "No applicable room pricing found for this date"
      );
    }

    // =========================
    // Highest Priority Wins
    // =========================

    return applicablePricing[0];
  };