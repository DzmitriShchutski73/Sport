export type AuthUser = {
  id: number;
  email: string;
  name: string;
  phone: string;
  date_joined?: string;
};

export type Lead = {
  id: number;
  lead_type: string;
  lead_type_display: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  created_at: string;
  is_processed: boolean;
};

const TOKEN_KEY = "goldgym_token";
const USER_KEY = "goldgym_user";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:8000/api";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function saveSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

async function authFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Token ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail =
      json?.detail ||
      (typeof json === "object"
        ? Object.values(json).flat().join(" ")
        : null) ||
      `Ошибка ${res.status}`;
    throw new Error(String(detail));
  }
  return json as T;
}

export function register(data: {
  email: string;
  password: string;
  name: string;
  phone?: string;
}) {
  return authFetch<{ token: string; user: AuthUser }>("/auth/register/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function login(data: { email: string; password: string }) {
  return authFetch<{ token: string; user: AuthUser }>("/auth/login/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function fetchMe() {
  return authFetch<AuthUser>("/auth/me/");
}

export function logoutRequest() {
  return authFetch<{ ok: boolean }>("/auth/logout/", { method: "POST" });
}

export function fetchMyLeads() {
  return authFetch<Lead[]>("/leads/mine/");
}
