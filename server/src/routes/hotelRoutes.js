import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {createHotelController,getHotels,getHotel,updateHotelController,toggleHotelStatusController,deleteHotelController,} from "../controllers/hotelController.js";

const router = express.Router();


// ========================= Admin Hotel Management =========================

// Create Hotel
router.post("/",authMiddleware, adminMiddleware,createHotelController);


// Get All Hotels
router.get("/",authMiddleware,adminMiddleware,getHotels);


// Get Single Hotel
router.get("/:id",authMiddleware,adminMiddleware,getHotel);


// Update Hotel
router.put("/:id",authMiddleware,adminMiddleware,updateHotelController);


// Activate / Deactivate Hotel
router.patch("/:id/toggle-status",authMiddleware,adminMiddleware,toggleHotelStatusController);


// Delete Hotel
router.delete("/:id",authMiddleware,adminMiddleware,deleteHotelController);


export default router;