import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../config/env";

export class HttpError extends Error {
  status: number;
  data?: unknown;
  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
  validateStatus: (s) => s >= 200 && s < 300,
});


http.interceptors.response.use(
  (res) => {
    if (typeof res.data === "string") {
      try {
        res.data = JSON.parse(res.data);
      } catch {
        
      }
    }
    return res;
  },
  (error: AxiosError) => {
    console.log(JSON.stringify(error))
    if (error.response) {
      const status = error.response.status;
      const payload = error.response.data;
      const message =
        (payload && typeof payload === "object" && "message" in (payload as any))
          ? (payload as any).message
          : error.message || `HTTP ${status}`;
      return Promise.reject(new HttpError(status, message, payload));
    }
    if (error.request) {
      return Promise.reject(new HttpError(0, "Network error or no response from server"));
    }
    return Promise.reject(new HttpError(-1, error.message));
  }
);

// Helpers génériques typés
export async function httpGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await http.get<T>(url, config);
  return res.data as T;
}
export async function httpPost<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const res = await http.post<T>(url, body, config);
  return res.data as T;
}
export async function httpPut<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const res = await http.put<T>(url, body, config);
  return res.data as T;
}
export async function httpPatch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const res = await http.patch<T>(url, body, config);
  return res.data as T;
}
export async function httpDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await http.delete<T>(url, config);
  return res.data as T;
}

export { http };