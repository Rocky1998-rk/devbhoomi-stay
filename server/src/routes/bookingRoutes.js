import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {createBookingController,getOwnerBookingsController,getOwnerBookingByIdController,updateBookingStatusController,} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/",authMiddleware,createBookingController);

router.get("/",authMiddleware,getOwnerBookingsController);

router.get("/:bookingId",authMiddleware,getOwnerBookingByIdController);

router.patch("/:bookingId/status",authMiddleware,updateBookingStatusController);

export default router;

