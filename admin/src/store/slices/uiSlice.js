import { createSlice } from "@reduxjs/toolkit";

const initialCollapsed = localStorage.getItem("devbhoomi_admin_sidebar_collapsed") === "true";

const initialState = {
  sidebarCollapsed: initialCollapsed,
  mobileSidebarOpen: false,
  selectedLocation: "All Locations",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem("devbhoomi_admin_sidebar_collapsed", state.sidebarCollapsed);
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
      localStorage.setItem("devbhoomi_admin_sidebar_collapsed", action.payload);
    },
    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
    setMobileSidebarOpen: (state, action) => {
      state.mobileSidebarOpen = action.payload;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
  },
});

export const {
  toggleSidebarCollapsed,
  setSidebarCollapsed,
  toggleMobileSidebar,
  setMobileSidebarOpen,
  setSelectedLocation,
} = uiSlice.actions;

// Selectors
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed;
export const selectMobileSidebarOpen = (state) => state.ui.mobileSidebarOpen;
export const selectSelectedLocation = (state) => state.ui.selectedLocation;

export default uiSlice.reducer;
