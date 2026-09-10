import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import ownerMiddleware from "../middleware/ownerMiddleware.js";

import {
  createRoomCategoryController,
  getOwnerRoomCategoriesController,
  getOwnerRoomCategoryController,
  updateOwnerRoomCategoryController,activateRoomCategoryController,
  deactivateRoomCategoryController,
} from "../controllers/roomCategoryController.js";

const router = express.Router();

// ========================= Owner Room Category Routes =========================

// Create Room Category

router.post("/",authMiddleware,ownerMiddleware,createRoomCategoryController);

// Get All Room Categories
router.get(
  "/",
  authMiddleware,
  ownerMiddleware,
  getOwnerRoomCategoriesController
);

// Get Single Room Category
router.get(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  getOwnerRoomCategoryController
);

// Update Room Category
router.put(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  updateOwnerRoomCategoryController
);

// Activate Room Category
router.patch(
  "/:id/activate",
  authMiddleware,
  ownerMiddleware,
  activateRoomCategoryController
);

// Deactivate Room Category
router.patch(
  "/:id/deactivate",
  authMiddleware,
  ownerMiddleware,
  deactivateRoomCategoryController
);

export default router;