import { api } from "../lib/axios";
import type { ApiResponse } from "../types/api";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

export async function login(body: LoginRequest) {
  const { data } = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    body,
  );

  return data.data;
}

export async function getCurrentUser() {
  const { data } = await api.get<ApiResponse<LoginResponse>>("/auth/me");

  return data.data;
}

export async function logout() {
  await api.post("/auth/logout");
}
