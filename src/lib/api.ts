import axios, { type InternalAxiosRequestConfig } from "axios";

import { clearAccessToken, getAccessToken, setAccessToken } from "./token";

import type { RefreshResponse } from "../types/types";

import { normalizeError } from "./normalizeErrors";

let onAuthFailure: (() => void) | null = null;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const response = await refreshClient.post<RefreshResponse>("/auth/refresh");

  const newAccessToken = response.data.data.accessToken;

  setAccessToken(newAccessToken);

  return newAccessToken;
}

function getRefreshedToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(normalizeError(error));
    }

    if (!error.response) {
      return Promise.reject(normalizeError(error));
    }

    if (originalRequest.skipAuthRefresh) {
      return Promise.reject(normalizeError(error));
    }

    if (error.response.status !== 401) {
      return Promise.reject(normalizeError(error));
    }

    if (originalRequest._retry) {
      return Promise.reject(normalizeError(error));
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await getRefreshedToken();

      originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);

      return api(originalRequest);
    } catch (refreshError) {
      clearAccessToken();
      onAuthFailure?.();

      return Promise.reject(normalizeError(refreshError));
    }
  },
);

export function setAuthFailureHandler(handler: (() => void) | null) {
  onAuthFailure = handler;
}
