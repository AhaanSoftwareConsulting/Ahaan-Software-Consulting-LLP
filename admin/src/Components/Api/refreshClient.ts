// src/Components/Api/refreshClient.ts
import axios from "axios";
import { setAccessToken } from "../app/tokenStore";
import { BASE_URL } from "./userapi";

let refreshPromise: Promise<string> | null = null;

export function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true })
      .then((res) => {
        const token = res.data.accessToken || res.data.access_token;
        if (!token) throw new Error("No token returned");
        setAccessToken(token);
        return token;
      })
      .finally(() => {
        refreshPromise = null; // release lock once settled, success or failure
      });
  }
  return refreshPromise; // any concurrent caller reuses this same in-flight promise
}