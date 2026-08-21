import { api } from "../lib/api";

import type {
  LoginResponse,
  LoginRequest,
  User,
  RefreshResponse,
} from "../types/types";
import { normalizeError } from "../lib/normalizeErrors";

export async function userLogin(
  credentials: LoginRequest,
): Promise<LoginResponse["data"]> {
  try {
    const response = await api.post<LoginResponse>("/auth/login", credentials, {
      skipAuthRefresh: true,
    });
    return response.data.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function userRefresh(): Promise<RefreshResponse["data"]> {
  const response = await api.post<RefreshResponse>("/auth/refresh");
  return response.data.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("/auth/me");

  return response.data;
}

export async function userLogout(): Promise<void> {
  await api.post("/auth/logout");
}
