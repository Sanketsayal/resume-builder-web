import { type ReactNode, useState } from "react";
import type { User, LoginRequest } from "../types/types";
import { AuthContext } from "../context/AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isAuthenticated = user !== null;

  async function login(credentials: LoginRequest) {
    setIsLoading(true);

    try {
      console.log(credentials);

      const fakeUser: User = {
        id: "1",
        email: credentials.email,
        name: "Sanket",
      };

      setUser(fakeUser);
    } finally {
      setIsLoading(false);
    }
  }
  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout }}
    >
        {children}
    </AuthContext.Provider>
  );
}