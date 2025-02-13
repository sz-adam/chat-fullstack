import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../model/UserModel";
import { apiClient } from "../lib/axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  authUser: User | null;
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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, checkAuth, authUser }}
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
