import { api } from "../lib/api";

import type { LoginResponse, LoginRequest } from "../types/types";

export async function userLogin(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", credentials);

  return response.data;
}
