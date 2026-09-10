import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {createRoomController,getRooms,getRoom,updateRoomController,updateRoomAvailabilityController,
deactivateRoomController,activateRoomController} from "../controllers/adminRoomController.js";

const router = express.Router();


// ========================= Hotel Rooms (Admin) =========================

// Create Room
router.post("/hotels/:hotelId/rooms",authMiddleware,adminMiddleware,createRoomController);


// Get All Rooms of Hotel
router.get("/hotels/:hotelId/rooms",authMiddleware,adminMiddleware,getRooms);


// Get Single Room
router.get("/rooms/:id",authMiddleware,adminMiddleware,getRoom);


// Update Room
router.put("/rooms/:id",authMiddleware,adminMiddleware,updateRoomController);


// Update Availability
router.patch("/rooms/:id/availability",authMiddleware,adminMiddleware,updateRoomAvailabilityController);

//============= Activate Room
router.patch("/rooms/:id/activate",authMiddleware,adminMiddleware,activateRoomController);

// Deactivate Room
router.patch("/rooms/:id/deactivate",authMiddleware,adminMiddleware,deactivateRoomController);

export default router;