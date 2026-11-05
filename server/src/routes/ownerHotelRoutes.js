import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import ownerMiddleware from "../middleware/ownerMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import {
  createMyHotel,
  getMyHotel,
  updateMyHotel,
  uploadHotelImagesController,
} from "../controllers/ownerHotelController.js";

const router =
  express.Router();

// =========================
// Get My Hotel
// =========================

router.post(
  "/",
  authMiddleware,
  ownerMiddleware,
  createMyHotel
);

// =========================
// Get My Hotel
// =========================

router.get(
  "/",
  authMiddleware,
  ownerMiddleware,
  getMyHotel
);

// =========================
// Update My Hotel
// =========================

router.put(
  "/",
  authMiddleware,
  ownerMiddleware,
  updateMyHotel
);

// =========================
// Upload Hotel Images
// =========================

router.post(
  "/:hotelId/images",
  authMiddleware,
  ownerMiddleware,

  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },

    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),

  uploadHotelImagesController
);

export default router;