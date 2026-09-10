import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import ownerMiddleware from "../middleware/ownerMiddleware.js";
import {getMyHotel,updateMyHotel,} from "../controllers/ownerHotelController.js";

const router = express.Router();


// ========================= Get My Hotel =========================

router.get("/",authMiddleware,ownerMiddleware,getMyHotel);


// ========================= Update My Hotel =========================

router.put("/",authMiddleware,ownerMiddleware,updateMyHotel);


export default router;