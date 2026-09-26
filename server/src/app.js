import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import ownerHotelRoutes from "./routes/ownerHotelRoutes.js";
import roomRoutes from "./routes/adminRoomRoutes.js";
import ownerRoomRoutes from "./routes/ownerRoomRoutes.js";
import roomCategoryRoutes from "./routes/roomCategoryRoutes.js";
import ownerRoomPricingRoutes from "./routes/ownerRoomPricingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import whatsappRoutes from "./routes/whatsappRoutes.js";

const app = express();

// ========================= Middlewares =========================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({ origin: "http://localhost:5174",
        credentials: true,
  })
);

// ========================= Health Check =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DevBhoomi Stay API is running...",
  });
});

// ========================= Authentication Routes =========================

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/admin/hotels", hotelRoutes);
app.use("/api/owner/hotel", ownerHotelRoutes);
app.use("/api/admin", roomRoutes);
app.use("/api/owner/rooms", ownerRoomRoutes);
app.use("/api/owner/room-categories",roomCategoryRoutes);
app.use("/api/owner",ownerRoomPricingRoutes);
app.use("/api/owner/bookings", bookingRoutes);
app.use("/api/whatsapp", whatsappRoutes);

export default app;