import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api";

const TOKEN_KEY = "agriconnect_token";
const USER_KEY = "agriconnect_user";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  const persistSession = useCallback((accessToken, nextUser) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(accessToken);
    setUser(nextUser);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const response = await api.get("/api/auth/me");
    const nextUser = response.data;
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  }, []);

  useEffect(() => {
    async function bootstrap() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        await refreshUser();
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    }

    bootstrap();
  }, [token, refreshUser, clearSession]);

  const login = useCallback(
    async (email, password) => {
      const response = await api.post("/api/auth/login", { email, password });
      const { access_token, user: nextUser } = response.data;
      persistSession(access_token, nextUser);
      return nextUser;
    },
    [persistSession]
  );

  const register = useCallback(
    async ({ email, password, full_name, role }) => {
      const response = await api.post("/api/auth/register", {
        email,
        password,
        full_name,
        role,
      });
      const { access_token, user: nextUser } = response.data;
      persistSession(access_token, nextUser);
      return nextUser;
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, token, loading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
