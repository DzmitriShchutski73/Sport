"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AuthUser,
  clearSession,
  fetchMe,
  getStoredUser,
  getToken,
  login as apiLogin,
  logoutRequest,
  register as apiRegister,
  saveSession,
} from "@/lib/auth";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getStoredUser();
    if (!storedToken) {
      setLoading(false);
      return;
    }
    setToken(storedToken);
    setUser(storedUser);
    fetchMe()
      .then((me) => {
        setUser(me);
        saveSession(storedToken, me);
      })
      .catch(() => {
        clearSession();
        setUser(null);
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiLogin({ email, password });
    saveSession(res.token, res.user);
    setToken(res.token);
    setUser(res.user);
  }, []);

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      name: string;
      phone?: string;
    }) => {
      const res = await apiRegister(data);
      saveSession(res.token, res.user);
      setToken(res.token);
      setUser(res.user);
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      /* ignore */
    }
    clearSession();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, token }),
    [user, loading, login, register, logout, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
