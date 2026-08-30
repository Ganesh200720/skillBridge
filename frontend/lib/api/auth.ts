/**
 * SkillBridge — Auth API calls
 * POST /api/v1/auth/login/
 * POST /api/v1/auth/signup/
 * GET  /api/v1/auth/me/
 */

import { request, setTokens, clearTokens } from "./client";
import type { LoginRequest, LoginResponse, SignupRequest, User } from "@/types";

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const data = await request<LoginResponse>("/auth/login/", {
    method: "POST",
    body: credentials,
    authenticated: false,
  });
  setTokens(data.access, data.refresh);
  return data;
}

export async function signup(payload: SignupRequest): Promise<User> {
  return request<User>("/auth/signup/", {
    method: "POST",
    body: payload,
    authenticated: false,
  });
}

export async function getCurrentUser(): Promise<User> {
  return request<User>("/auth/me/", { authenticated: true });
}

export function logout(): void {
  clearTokens();
}

