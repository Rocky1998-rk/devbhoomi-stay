import RoomPricing from "../models/RoomPricing.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// =========================
// Create Room Pricing
// =========================

export const createRoomPricing = async (
  ownerId,
  roomId,
  pricingData
) => {
  // =========================
  // Find Owner's Active Hotel
  // =========================

  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  // =========================
  // Check Room Ownership
  // =========================

  const room = await Room.findOne({
    _id: roomId,
    hotel: hotel._id,
  });

  if (!room) {
    throw new Error("Room not found for this owner");
  }

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
    pricePerNight === undefined
  ) {
    throw new Error(
      "Pricing type, name, dates and price are required"
    );
  }

  // =========================
  // Validate Pricing Type
  // =========================

  if (
    !["normal", "season", "blackout"].includes(
      pricingType
    )
  ) {
    throw new Error("Invalid pricing type");
  }

  // =========================
  // Validate Dates
  // =========================

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (
    isNaN(start.getTime()) ||
    isNaN(end.getTime())
  ) {
    throw new Error("Invalid pricing dates");
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
    typeof pricePerNight !== "number" ||
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

  if (pricingType === "normal") {
    priority = 1;
  }

  if (pricingType === "season") {
    priority = 2;
  }

  if (pricingType === "blackout") {
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

  const pricing = await RoomPricing.create({
    room: room._id,
    hotel: hotel._id,
    pricingType,
    name: name.trim(),
    startDate: start,
    endDate: end,
    pricePerNight,
    priority,
    isActive: true,
  });

  return pricing;
};

// =========================
// Get Room Pricing
// =========================

export const getRoomPricing = async (
  ownerId,
  roomId
) => {
  // =========================
  // Find Owner's Active Hotel
  // =========================

  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  // =========================
  // Check Room Ownership
  // =========================

  const room = await Room.findOne({
    _id: roomId,
    hotel: hotel._id,
  });

  if (!room) {
    throw new Error("Room not found for this owner");
  }

  // =========================
  // Get Active Pricing
  // =========================

  const pricing = await RoomPricing.find({
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

export const activateRoomPricing = async (
  ownerId,
  pricingId
) => {
  // Find owner's active hotel
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  // Find inactive pricing belonging to owner's hotel
  const pricing = await RoomPricing.findOne({
    _id: pricingId,
    hotel: hotel._id,
    isActive: false,
  });

  if (!pricing) {
    throw new Error(
      "Room pricing not found or already active"
    );
  }

  // Activate pricing
  pricing.isActive = true;

  await pricing.save();

  return pricing;
};

// =========================
// Deactivate Room Pricing
// =========================

export const deactivateRoomPricing = async (
  ownerId,
  pricingId
) => {
  // Find owner's active hotel
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  // Find active pricing belonging to owner's hotel
  const pricing = await RoomPricing.findOne({
    _id: pricingId,
    hotel: hotel._id,
    isActive: true,
  });

  if (!pricing) {
    throw new Error(
      "Room pricing not found or already inactive"
    );
  }

  // Deactivate pricing
  pricing.isActive = false;

  await pricing.save();

  return pricing;
};

// =========================
// Update Room Pricing
// =========================

export const updateRoomPricing = async (
  ownerId,
  pricingId,
  pricingData
) => {
  // Find owner's active hotel
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  // Find pricing belonging to owner's hotel
  const pricing = await RoomPricing.findOne({
    _id: pricingId,
    hotel: hotel._id,
  });

  if (!pricing) {
    throw new Error("Room pricing not found for this owner");
  }

  const {
    pricingType,
    name,
    startDate,
    endDate,
    pricePerNight,
    priority,
  } = pricingData;

  // Validate pricing type if provided
  if (
    pricingType !== undefined &&
    !["normal", "season", "blackout"].includes(
      pricingType
    )
  ) {
    throw new Error("Invalid pricing type");
  }

  // Final values
  const finalPricingType =
    pricingType !== undefined
      ? pricingType
      : pricing.pricingType;

  const finalName =
    name !== undefined ? name : pricing.name;

  const finalStartDate =
    startDate !== undefined
      ? new Date(startDate)
      : pricing.startDate;

  const finalEndDate =
    endDate !== undefined
      ? new Date(endDate)
      : pricing.endDate;

  const finalPrice =
    pricePerNight !== undefined
      ? pricePerNight
      : pricing.pricePerNight;

  const finalPriority =
    priority !== undefined
      ? priority
      : pricing.priority;

  // Validate dates
  if (
    isNaN(finalStartDate.getTime()) ||
    isNaN(finalEndDate.getTime())
  ) {
    throw new Error("Invalid pricing dates");
  }

  if (finalEndDate < finalStartDate) {
    throw new Error(
      "End date cannot be before start date"
    );
  }

  // Validate price
  if (finalPrice < 0) {
    throw new Error(
      "Price per night cannot be negative"
    );
  }

  // Validate priority
  if (finalPriority < 1) {
    throw new Error("Priority must be at least 1");
  }

  // Check same-type overlapping pricing
  // Exclude current pricing record
  const overlappingPricing =
    await RoomPricing.findOne({
      _id: { $ne: pricing._id },
      room: pricing.room,
      hotel: hotel._id,
      pricingType: finalPricingType,
      isActive: true,
      startDate: { $lte: finalEndDate },
      endDate: { $gte: finalStartDate },
    });

  if (overlappingPricing) {
    throw new Error(
      `Overlapping ${finalPricingType} pricing already exists for this date range`
    );
  }

  // Update pricing
  pricing.pricingType = finalPricingType;
  pricing.name = finalName;
  pricing.startDate = finalStartDate;
  pricing.endDate = finalEndDate;
  pricing.pricePerNight = finalPrice;
  pricing.priority = finalPriority;

  await pricing.save();

  return pricing;
};


// =========================
// Get Applicable Room Pricing
// =========================

export const getApplicableRoomPricing = async (
  ownerId,
  roomId,
  bookingDate
) => {
  // Find owner's active hotel
  const hotel = await Hotel.findOne({
    owner: ownerId,
    isActive: true,
  });

  if (!hotel) {
    throw new Error("Hotel not found for this owner");
  }

  // Check room belongs to owner's hotel
  const room = await Room.findOne({
    _id: roomId,
    hotel: hotel._id,
    isActive: true,
  });

  if (!room) {
    throw new Error("Room not found for this owner");
  }

  // Validate booking date
  const date = new Date(bookingDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid booking date");
  }

  // Find all active pricing applicable on booking date
  const applicablePricing = await RoomPricing.find({
    room: room._id,
    hotel: hotel._id,
    isActive: true,
    startDate: { $lte: date },
    endDate: { $gte: date },
  }).sort({
    priority: -1,
  });

  if (!applicablePricing.length) {
    throw new Error(
      "No applicable room pricing found for this date"
    );
  }

  // Highest priority pricing wins
  return applicablePricing[0];
};