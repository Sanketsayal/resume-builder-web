export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
}

export interface LoginResponse {
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}
