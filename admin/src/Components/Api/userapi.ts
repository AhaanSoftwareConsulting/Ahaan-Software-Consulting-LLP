import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = "https://ahaan-software-consulting-llp-1.onrender.com";
// const BASE_URL = "http://localhost:8000";

const API: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
  },
});

// Avoid infinite loops if refresh requests fail
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// =======================
// 1. Request Interceptor
// =======================
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed?.accessToken) {
        config.headers.Authorization = `Bearer ${parsed.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// 2. Response Interceptor (Auto Refresh Logic)
// =======================
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Trigger only on 401 errors and ensure we don't infinitely loop on retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh is already in progress, queue subsequent failing requests
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

     try {
  const user = localStorage.getItem("user");
  const parsed = user ? JSON.parse(user) : null;

  // Correct URL + snake_case body key to match auth.controller.js
  const response = await axios.post(`${BASE_URL}/auth/refresh`, {
    refresh_token: parsed?.refreshToken,
  }, { withCredentials: true });

  // Backend returns snake_case fields
  const newAccessToken = response.data.access_token;
  const newRefreshToken = response.data.refresh_token;

  // Update localStorage — must save BOTH, since refresh tokens rotate
  // (the old refresh token is invalidated by sessionsService.rotate)
  if (parsed) {
    parsed.accessToken = newAccessToken;
    parsed.refreshToken = newRefreshToken;
    localStorage.setItem("user", JSON.stringify(parsed));
  }

  API.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

  processQueue(null, newAccessToken);
  return API(originalRequest);
} catch (refreshError) {
  processQueue(refreshError, null);
  localStorage.removeItem("user");
  window.location.href = "/login";
  return Promise.reject(refreshError);
} finally {
  isRefreshing = false;
}
    }

    return Promise.reject(error);
  }
);

// =======================
// Authentication & User API
// =======================

export const registerAPI = (data: {
  fullName: string;
  email: string;
  password: string;
  role: string;
}) => API.post("/auth/register", data);

export const loginAPI = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const profileAPI = () => API.get("/auth/me");

export const logoutAPI = () => API.post("/auth/logout");

export const getPendingUsersAPI = () => API.get("/approval/pending");

export const getUsersByStatusAPI = (status: string) =>
  API.get(`/approval?status=${status}`);

export const approveUserAPI = (requestId: string) =>
  API.patch(`/approval/${requestId}/approve`);

export const rejectUserAPI = (requestId: string, reason?: string) =>
  API.patch(`/approval/${requestId}/reject`, { reason });


export default API;