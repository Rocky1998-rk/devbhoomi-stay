import { createSlice } from "@reduxjs/toolkit";
import { getBookings, updateBookingStatus } from "../thunks/bookingThunks";

// Re-export thunks for seamless imports
export { getBookings, updateBookingStatus };

const initialBookings = [
  {
    id: "BK-8021",
    customerName: "Aarav Sharma",
    phone: "+91 98765 43210",
    hotelName: "Pine Crest Resort Lansdowne",
    roomType: "Luxury Himalayan Suite",
    checkIn: "2026-11-02",
    checkOut: "2026-11-05",
    amount: "₹18,500",
    tokenPaid: "₹3,500",
    status: "Confirmed",
    paymentStatus: "Partial",
    source: "WhatsApp Bot",
  },
  {
    id: "BK-8022",
    customerName: "Pooja Bisht",
    phone: "+91 94120 11223",
    hotelName: "Kotdwar Gateway Retreat",
    roomType: "Deluxe Mountain View",
    checkIn: "2026-11-03",
    checkOut: "2026-11-04",
    amount: "₹6,800",
    tokenPaid: "₹6,800",
    status: "Confirmed",
    paymentStatus: "Paid",
    source: "Direct Website",
  },
  {
    id: "BK-8023",
    customerName: "Vikram Negi",
    phone: "+91 98112 33445",
    hotelName: "The Green Valley Stay",
    roomType: "Family Cottage (2 BHK)",
    checkIn: "2026-11-06",
    checkOut: "2026-11-09",
    amount: "₹24,000",
    tokenPaid: "₹5,000",
    status: "Pending",
    paymentStatus: "Partial",
    source: "WhatsApp Bot",
  },
  {
    id: "BK-8024",
    customerName: "Sneha Rawat",
    phone: "+91 87550 99881",
    hotelName: "Lansdowne Hilltop Villa",
    roomType: "Executive Forest Room",
    checkIn: "2026-11-10",
    checkOut: "2026-11-12",
    amount: "₹12,400",
    tokenPaid: "₹0",
    status: "Cancelled",
    paymentStatus: "Refunded",
    source: "Phone Enquiry",
  },
];

const initialState = {
  bookings: initialBookings,
  selectedBooking: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setSelectedBooking: (state, action) => {
      state.selectedBooking = action.payload;
    },
    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getBookings
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.bookings = action.payload;
        }
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateBookingStatus
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const { bookingId, newStatus } = action.payload;
        const index = state.bookings.findIndex((b) => b.id === bookingId);
        if (index !== -1) {
          state.bookings[index].status = newStatus;
        }
        if (state.selectedBooking && state.selectedBooking.id === bookingId) {
          state.selectedBooking.status = newStatus;
        }
      });
  },
});

export const { setSelectedBooking, clearSelectedBooking } = bookingSlice.actions;

// Selectors
export const selectAllBookings = (state) => state.bookings.bookings;
export const selectSelectedBooking = (state) => state.bookings.selectedBooking;
export const selectBookingsLoading = (state) => state.bookings.loading;

export default bookingSlice.reducer;
