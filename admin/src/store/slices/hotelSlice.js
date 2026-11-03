import { createSlice } from "@reduxjs/toolkit";
import { getHotels, getHotelById } from "../thunks/hotelThunks";

// Re-export thunks for seamless imports
export { getHotels, getHotelById };

const initialState = {
  hotels: [],
  selectedHotel: null,
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    clearHotelSelection: (state) => {
      state.selectedHotel = null;
    },
    clearHotelError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getHotels
      .addCase(getHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
      })
      .addCase(getHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getHotelById
      .addCase(getHotelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHotelById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedHotel = action.payload;
      })
      .addCase(getHotelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHotelSelection, clearHotelError } = hotelSlice.actions;

// Selectors
export const selectAllHotels = (state) => state.hotels.hotels;
export const selectSelectedHotel = (state) => state.hotels.selectedHotel;
export const selectHotelsLoading = (state) => state.hotels.loading;
export const selectHotelsError = (state) => state.hotels.error;

export default hotelSlice.reducer;
