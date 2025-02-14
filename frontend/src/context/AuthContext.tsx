import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../model/UserModel";
import { apiClient } from "../lib/axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  authUser: User | null;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        setAuthUser(response.data.user);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await apiClient.get("auth/check");
      setAuthUser(response.data);
    } catch (error) {
      console.log("Error in checkAuth:", error);
      setAuthUser(null);
    } finally {
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("auth/logout");
      setAuthUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("logout error:", error);
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await apiClient.post("/auth/signup", {
        fullName,
        email,
        password,
      });
      if (response.status === 201) {
        setAuthUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, checkAuth, authUser, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
