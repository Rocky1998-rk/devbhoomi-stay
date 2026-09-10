import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import ownerMiddleware from "../middleware/ownerMiddleware.js";

import {getOwnerRoomsController,getOwnerRoomController,updateOwnerRoomController,updateOwnerRoomAvailabilityController,} from "../controllers/ownerRoomController.js";

import {assignRoomCategoryController,} from "../controllers/adminRoomController.js";

const router = express.Router();


// ========================= Get All Owner Rooms =========================

router.get("/",authMiddleware,ownerMiddleware,getOwnerRoomsController);


// ========================= Get Single Owner Room =========================

router.get("/:id",authMiddleware,ownerMiddleware,getOwnerRoomController);


// ========================= Update Owner Room =========================

router.put("/:id",authMiddleware,ownerMiddleware,updateOwnerRoomController);

// ========================= Update Owner Room Availability =========================

router.patch("/:id/availability",authMiddleware,ownerMiddleware,updateOwnerRoomAvailabilityController);

// =========================
// Assign Room Category
// =========================

router.patch("/:id/category",authMiddleware,ownerMiddleware,assignRoomCategoryController);

export default router;