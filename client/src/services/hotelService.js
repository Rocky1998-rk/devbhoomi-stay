import axios from "axios";
import { CURATED_HOTELS } from "../constants/config";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAllHotels = async () => {
  try {
    // Try to fetch hotels from the backend
    const response = await api.get("/admin/hotels");
    if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
      // Enrich backend hotels with their unique 8-image curated galleries
      return response.data.data.map((hotel) => {
        const curated = CURATED_HOTELS.find(
          (c) =>
            c._id === hotel._id ||
            c.hotelName?.toLowerCase().trim() === hotel.hotelName?.toLowerCase().trim()
        );
        if (curated) {
          return {
            ...curated,
            ...hotel,
            // If backend has fewer than 7 images, use the hotel's unique 8-image curated gallery
            images: Array.isArray(hotel.images) && hotel.images.length >= 7 ? hotel.images : curated.images,
            coverImage: hotel.coverImage || curated.coverImage,
          };
        }
        return hotel;
      });
    }
    // Return curated authentic stays
    return CURATED_HOTELS;
  } catch {
    // Graceful fallback to verified curated stays so users always see accurate showcase
    console.info("Using local curated hotel repository (backend not reachable or offline)");
    return CURATED_HOTELS;
  }
};

export const fetchHotelById = async (id) => {
  try {
    const response = await api.get(`/admin/hotels/${id}`);
    if (response.data && response.data.success && response.data.data) {
      const hotel = response.data.data;
      const curated = CURATED_HOTELS.find(
        (c) =>
          c._id === hotel._id ||
          c.hotelName?.toLowerCase().trim() === hotel.hotelName?.toLowerCase().trim()
      );
      if (curated) {
        return {
          ...curated,
          ...hotel,
          images: Array.isArray(hotel.images) && hotel.images.length >= 7 ? hotel.images : curated.images,
          coverImage: hotel.coverImage || curated.coverImage,
        };
      }
      return hotel;
    }
    const found = CURATED_HOTELS.find((h) => h._id === id);
    if (found) return found;
    throw new Error("Hotel not found");
  } catch (error) {
    const found = CURATED_HOTELS.find((h) => h._id === id);
    if (found) return found;
    throw error;
  }
};
