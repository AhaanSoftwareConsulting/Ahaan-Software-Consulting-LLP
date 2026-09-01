import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, setAccessToken } from "../app/tokenStore";
import { refreshAccessToken } from "./refreshClient";
// export const BASE_URL = "http://localhost:8000";
export const BASE_URL = "https://ahaan-software-consulting-llp.onrender.com";
const API: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" },
});
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : token && p.resolve(token)));
  failedQueue = [];
};
API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export const registerAPI = (data: { fullName: string; email: string; password: string; role: string }) =>
  API.post("/auth/register", data);
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