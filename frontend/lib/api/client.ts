/**
 * SkillBridge — Centralised API client
 *
 * All HTTP calls go through this module.
 * Components NEVER call fetch() directly.
 *
 * Base URL is read from NEXT_PUBLIC_API_BASE_URL (set in .env.local).
 * Token storage uses localStorage — suitable for this SPA prototype.
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api/v1";

// -----------------------------------------------------------------------
// Token helpers
// -----------------------------------------------------------------------

const ACCESS_KEY = "sb_access";
const REFRESH_KEY = "sb_refresh";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(access: string, refresh: string): void {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

// -----------------------------------------------------------------------
// Core request helper
// -----------------------------------------------------------------------

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  authenticated?: boolean;
}

export class ApiClientError extends Error {
  constructor(
    public status: number,
    public data: unknown,
    message?: string
  ) {
    super(message ?? `API error ${status}`);
    this.name = "ApiClientError";
  }
}

export async function request<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, authenticated = true } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authenticated) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // 204 No Content
  if (res.status === 204) return undefined as T;

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new ApiClientError(res.status, data);
  }

  return data as T;
}
