import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import hotelReducer from "./slices/hotelSlice";
import bookingReducer from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    hotels: hotelReducer,
    bookings: bookingReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
