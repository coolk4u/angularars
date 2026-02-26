// src/app/models/auth.model.ts
export interface LoginRequest {
  dealerId: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthResponse {
  token: string;
  dealerId: string;
  dealerName: string;
  expiresIn: number;
}

export interface User {
  dealerId: string;
  dealerName: string;
  email: string;
  token: string;
}
