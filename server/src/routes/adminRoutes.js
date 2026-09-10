import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {getUsers,getUser,updateUserController,toggleStatus,deleteUserController,} from "../controllers/userController.js";

const router = express.Router();


// ========================= User Management =========================

// Get all users
router.get("/users",authMiddleware,adminMiddleware,getUsers);

// Get single user
router.get("/users/:id",authMiddleware,adminMiddleware,getUser);

// Update user
router.put("/users/:id",authMiddleware,adminMiddleware,updateUserController);

// Activate / Deactivate user
router.patch("/users/:id/toggle-status",authMiddleware,adminMiddleware,toggleStatus);

// Delete user
router.delete("/users/:id",authMiddleware,adminMiddleware,deleteUserController);

export default router;