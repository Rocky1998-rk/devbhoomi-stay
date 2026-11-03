import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllHotels,
  fetchHotelById as fetchHotelByIdService,
} from "../../services/hotelService";

/**
 * Async Thunk: Fetch All Hotels
 */
export const getHotels = createAsyncThunk( "hotels/getHotels",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllHotels();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch hotels");
    }
  }
);

/**
 * Async Thunk: Fetch Single Hotel by ID
 */
export const getHotelById = createAsyncThunk("hotels/getHotelById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchHotelByIdService(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch hotel details");
    }
  }
);

