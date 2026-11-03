import api from "./api";
import { STORAGE_KEYS } from "../constants/storageKeys";

/**
 * Utility to safely decode JWT payload (base64 URL) without external heavy libraries
 */
export const decodeToken = (token) => {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};

/**
 * Login Super Admin API Call
 * Calls backend POST /api/auth/login
 */
export const loginApi = async (email, password) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

/**
 * Session Storage Helpers
 */
export const saveAuthSession = (token, user) => {
  if (token) {
    sessionStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }
  if (user) {
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }
};

export const clearAuthSession = () => {
  sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.USER);
};

export const getAuthSession = () => {
  try {
    const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    const userStr = sessionStorage.getItem(STORAGE_KEYS.USER);
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
};

export default {
  loginApi,
  decodeToken,
  saveAuthSession,
  clearAuthSession,
  getAuthSession,
};
