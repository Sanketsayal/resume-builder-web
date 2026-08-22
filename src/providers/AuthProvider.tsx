import { type ReactNode, useEffect, useState } from "react";
import type { User, LoginRequest } from "../types/types";
import { AuthContext } from "../context/AuthContext";
import {
  getCurrentUser,
  userLogin,
  userLogout,
  userRefresh,
} from "../api/authApi";
import { clearAccessToken, setAccessToken as setToken } from "../lib/token";
import { setAuthFailureHandler } from "../lib/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const isAuthenticated = user !== null;

  useEffect(() => {
    async function initializeAuth() {
      try {
        const response = await userRefresh();

        setAccessToken(response.accessToken);
        setToken(response.accessToken);

        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        clearAccessToken();
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsInitialized(true);
      }
    }

    initializeAuth();
  }, []);

  useEffect(() => {
    setAuthFailureHandler(() => {
      clearAccessToken();
      setAccessToken(null);
      setUser(null);
    });

    return () => {
      setAuthFailureHandler(null);
    };
  }, []);

  async function login(credentials: LoginRequest) {
    setIsLoading(true);

    try {
      const response = await userLogin(credentials);

      setAccessToken(response.accessToken);
      setToken(response.accessToken);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  }
  async function logout() {
    try {
      await userLogout();
    } finally {
      setUser(null);
      setAccessToken(null);
      clearAccessToken();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        accessToken,
        isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
