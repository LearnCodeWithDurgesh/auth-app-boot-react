import axios from "axios";
import { useAuthStore } from "@/utils/auth";
import { refreshToken } from "@/services/auth.service";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // include cookies if using cookie-based auth
  timeout: 10000, // 10s timeout
});

// 2) Attach access token (from memory) before every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// 🚨 Optional: handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // logout or refresh token logic
      console.warn("Unauthorized, redirect to login");
    }
    return Promise.reject(error);
  }
);

//call refresh token to refresh access token
//If server says 401 (token expired), try to refresh once and retry
let isRefreshing = false;
let pending = [];

function queueRequest(cb) {
  pending.push(cb);
}
function resolveQueued(newToken) {
  pending.forEach((cb) => cb(newToken));
  pending = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const is401 = error.response?.status === 401;

    if (!is401 || original._retry) return Promise.reject(error);
    original._retry = true;

    // If a refresh is already running, wait for it
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queueRequest((newToken) => {
          if (!newToken) return reject(error);
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(original));
        });
      });
    }

    // Start refresh
    isRefreshing = true;
    try {
      const accessToken = await refreshToken();
      const newToken = accessToken.accessToken;
      console.log("new accestoken", newToken);
      if (!newToken) throw new Error("No access token returned");

      // Update memory state
      useAuthStore.getState().setAccessToken(newToken);

      // Resume queued requests
      resolveQueued(newToken);

      // Retry the original request
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch (err) {
      // Refresh failed: clear auth and fail everyone waiting
      resolveQueued(null);
      useAuthStore.getState().logout({ silent: true });
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
