import api from "@/utils/ApiClient";
import { create } from "zustand";
const TOKEN_KEY = "access_token";
export const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem(TOKEN_KEY),
  user: null,
  status: "idle",

  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    set({ accessToken: token });
  },
  // Called at app start to restore session (if cookie is valid)
  bootstrap: async () => {
    set({ status: "authenticating" });
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      // Keep token in memory so Axios interceptor works
      set({ accessToken: token });
    }
    try {
      // This will succeed if the access token (or cookie) is still valid

      if (token == null) {
        console.log("No token found");
        throw new Error("No token");
      }
      const response = await api.get("/auth/me");
      console.log("Current user:", response.data);
      set({ user: response.data, status: "authenticated" });
    } catch (e) {
      // Token might be expired or invalid — clear it
      console.log("Failed to fetch current user, logging out");
      localStorage.removeItem(TOKEN_KEY);
      set({ accessToken: null, user: null, status: "anonymous" });
    }
  },

  // Login: server sets httpOnly refresh cookie + returns accessToken + user
  login: async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    set({
      accessToken: data.accessToken,
      user: data.user,
      status: "authenticated",
    });
  },

  // Logout: server clears refresh cookie; we clear memory state
  // Logout: clear token both locally and in memory
  logout: async ({ silent } = {}) => {
    try {
      if (!silent) await api.post("/auth/logout");
    } catch {}
    localStorage.removeItem(TOKEN_KEY);
    set({ accessToken: null, user: null, status: "anonymous" });
  },
}));
``;
