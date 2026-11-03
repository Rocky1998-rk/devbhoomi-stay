import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Async Thunk: Fetch Bookings
 */
export const getBookings = createAsyncThunk(
  "bookings/getBookings",
  async (initialBookingsData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return initialBookingsData;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to load bookings");
    }
  }
);

/**
 * Async Thunk: Update Booking Status
 */
export const updateBookingStatus = createAsyncThunk(
  "bookings/updateBookingStatus",
  async ({ bookingId, newStatus }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { bookingId, newStatus };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update booking status");
    }
  }
);

