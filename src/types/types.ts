import type { AxiosRequestConfig } from "axios";

export interface ApiRequestConfig extends AxiosRequestConfig {
  skipAuthRefresh?: boolean;
  _retry?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}

export interface RefreshResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface AuthRedirectState {
  from?: {
    pathname: string;
    search?: string;
    hash?: string;
  };
}

export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
