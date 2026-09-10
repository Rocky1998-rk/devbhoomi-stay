import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import ownerMiddleware from "../middleware/ownerMiddleware.js";

import {
  createRoomPricingController,
  getRoomPricingController,
  deactivateRoomPricingController,
  activateRoomPricingController,
  updateRoomPricingController,
  getApplicableRoomPricingController,
} from "../controllers/roomPricingController.js";

const router = express.Router();


// =========================
// Create Room Pricing
// =========================

router.post(
  "/rooms/:roomId/pricing",
  authMiddleware,
  ownerMiddleware,
  createRoomPricingController
);


// =========================
// Get Room Pricing
// =========================

router.get(
  "/rooms/:roomId/pricing",
  authMiddleware,
  ownerMiddleware,
  getRoomPricingController
);


// =========================
// Activate Room Pricing
// =========================

router.patch(
  "/room-pricing/:id/activate",
  authMiddleware,
  ownerMiddleware,
  activateRoomPricingController
);



// =========================
// Deactivate Room Pricing
// =========================

router.patch(
  "/room-pricing/:id/deactivate",
  authMiddleware,
  ownerMiddleware,
  deactivateRoomPricingController
);


// =========================
// Update Room Pricing
// =========================

router.patch(
  "/room-pricing/:id",
  authMiddleware,
  ownerMiddleware,
  updateRoomPricingController
);

// =========================
// Get Applicable Room Pricing
// =========================

router.get(
  "/rooms/:roomId/pricing/applicable",
  authMiddleware,
  ownerMiddleware,
  getApplicableRoomPricingController
);

export default router;