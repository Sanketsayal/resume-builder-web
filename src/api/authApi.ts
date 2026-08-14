import { api } from "../lib/api";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export async function userLogin(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", credentials);

  return response.data;
}
