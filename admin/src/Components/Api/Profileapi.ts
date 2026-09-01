import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "../app/tokenStore";
import { refreshAccessToken } from "./refreshClient";

// profile-service runs on its own port, separate from auth-service (8000).
// Both services verify the SAME JWT (shared secret), so we reuse the
// access token already stored by auth-service's login flow — no separate
// login step needed for profile-service itself.
// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://ahaan-software-consulting-llp.onrender.com";

const ProfileAPI: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

// Attach the same Bearer token used for auth-service requests.
// Read from the in-memory token store (tokenStore.ts) — this app no longer
// persists the access token to localStorage.
ProfileAPI.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// On 401, try the same single-flight refresh used by auth-service calls,
// then retry once. No hard redirect here — ProtectedRoute already handles
// sending the user to /login if the session is genuinely gone.
ProfileAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return ProfileAPI(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// =======================
// Profile API
// =======================

export const getMyProfileAPI = () => ProfileAPI.get("/profile/me");

export const updateMyProfileAPI = (data: FormData) =>
  ProfileAPI.patch("/profile/me", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllProfilesAPI = () => ProfileAPI.get("/profile");

export const getProfileByUserIdAPI = (userId: string) =>
  ProfileAPI.get(`/profile/${userId}`);

export const deleteProfileAPI = (userId: string) =>
  ProfileAPI.delete(`/profile/${userId}`);

// Manager/CEO only — sets designation, department, employee_code,
// date_of_joining, employment_type, reporting_manager for a given user.
export const updateEmploymentAPI = (
  userId: string,
  data: {
    designation?: string;
    department?: string;
    employee_code?: string;
    date_of_joining?: string;
    employment_type?: string;
    reporting_manager?: string;
  }
) => ProfileAPI.patch(`/profile/${userId}/employment`, data);

export default ProfileAPI;