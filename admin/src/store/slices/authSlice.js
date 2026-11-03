import { createSlice } from "@reduxjs/toolkit";
import {
  saveAuthSession,
  clearAuthSession,
  getAuthSession,
} from "../../services/authService";
import { loginAdmin, loadUser, logoutAdmin } from "../thunks/authThunks";

// Re-export thunks so existing imports also work seamlessly
export { loginAdmin, loadUser, logoutAdmin };

// Initial State hydrated directly from SessionStorage
const { token: sessionToken, user: sessionUser } = getAuthSession();

const initialState = {
  user: sessionUser,
  token: sessionToken,
  isAuthenticated: !!sessionToken && !!sessionUser && sessionUser.role === "admin",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
      saveAuthSession(token, user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      clearAuthSession();
    },
  },
  extraReducers: (builder) => {
    // 1. loginAdmin
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed.";
      });

    // 2. loadUser
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = !!action.payload.token && !!action.payload.user;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
      });

    // 3. logoutAdmin
    builder.addCase(logoutAdmin.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { clearError, setCredentials, logout } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
