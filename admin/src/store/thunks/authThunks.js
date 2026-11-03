import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  decodeToken,
  saveAuthSession,
  clearAuthSession,
  getAuthSession,
} from "../../services/authService";

/**
 * Async Thunk: Real Database Login (POST /api/auth/login)
 */
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      if (!email || !password) {
        return rejectWithValue("Email and password are required.");
      }

      // 1. Call Real Backend API (POST /api/auth/login)
      let response;
      try {
        response = await loginApi(email, password);
      } catch (apiError) {
        // Handle server down / network failure explicitly
        if (!apiError.response) {
          return rejectWithValue("Backend server is not running.");
        }

        const backendMsg =
          apiError.response.data?.message ||
          "Invalid email or password. Please verify your DB credentials.";
        return rejectWithValue(backendMsg);
      }

      // 2. Validate Backend DB Response
      if (!response || !response.success || !response.token || !response.user) {
        return rejectWithValue(
          response?.message || "Login failed. Invalid response from server."
        );
      }

      const { token, user } = response;

      // 3. Extract & Validate Role from Token Payload
      const decodedPayload = decodeToken(token);
      const roleFromToken = decodedPayload?.role || user?.role;

      if (roleFromToken !== "admin") {
        return rejectWithValue(
          "Access Denied: Only Super Admins can access this portal."
        );
      }

      // 4. Attach verified DB role to real user data
      const verifiedDbUser = {
        ...user,
        role: roleFromToken,
      };

      // 5. Save REAL DB token & user in Session Storage
      saveAuthSession(token, verifiedDbUser);

      return { user: verifiedDbUser, token };
    } catch (err) {
      return rejectWithValue(
        err.message || "An unexpected error occurred during login."
      );
    }
  }
);

/**
 * Async Thunk: Load User Session from SessionStorage on App Initialization
 */
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { token, user } = getAuthSession();

      if (token && user) {
        const decoded = decodeToken(token);
        const role = decoded?.role || user.role;

        if (role === "admin") {
          return { user: { ...user, role }, token };
        }
      }

      clearAuthSession();
      return { user: null, token: null };
    } catch (err) {
      clearAuthSession();
      return rejectWithValue("Failed to restore session from sessionStorage.");
    }
  }
);

/**
 * Async Thunk: Logout Admin (Clears SessionStorage)
 */
export const logoutAdmin = createAsyncThunk("auth/logoutAdmin", async () => {
  clearAuthSession();
  return null;
});

