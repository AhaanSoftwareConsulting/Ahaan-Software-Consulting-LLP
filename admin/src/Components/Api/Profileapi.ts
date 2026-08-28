import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// profile-service runs on its own port, separate from auth-service (8000).
// Both services verify the SAME JWT (shared secret), so we reuse the
// access token already stored by auth-service's login flow — no separate
// login step needed for profile-service itself.
const BASE_URL = "http://localhost:5000";
// const BASE_URL = "https://ahaan-software-consulting-llp-1.onrender.com";

const ProfileAPI: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

// Attach the same Bearer token used for auth-service requests
ProfileAPI.interceptors.request.use(
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

// If the token is expired/invalid, bounce to login. Token *refresh* itself
// is handled by auth-service's own interceptor (userapi.ts) whenever the
// user hits an auth-service endpoint — this just guards profile-service
// calls made with an already-stale token.
ProfileAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
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