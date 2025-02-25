import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../model/UserModel";
import { apiClient } from "../lib/axios";
import { io, Socket } from "socket.io-client";

import { toast } from "react-toastify";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  authUser: User | null;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    gender: string
  ) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
  onlineUsers: string[];
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // Socket kapcsolat
  const connectSocket = () => {
    if (authUser && !socket) {
      const socketInstance = io("http://localhost:5001", {
        query: { userId: authUser.id },
        reconnection: true,
      });

      socketInstance.on("connect", () => {
        console.log(
          "Connected to socket server with socket ID:",
          socketInstance.id
        );
      });
      //csatlakozott felhasználók id-nak küldése
      socketInstance.on("getOnlineUsers", (userIds) => {
        console.log(userIds);
        setOnlineUsers(userIds);
      });
      //üzenetek figyelése
      socketInstance.on("newMessage", (message) => {
        console.log("New message received:", message);
      });

      setSocket(socketInstance);
    } else if (!authUser) {
      console.log("User is not authenticated. Cannot connect to socket.");
    } else {
      console.log("Socket already connected.");
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      console.log("Socket disconnected");
    }
  };

  useEffect(() => {
    if (authUser && !socket) {
      connectSocket();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [authUser]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      if (response.status === 200) {
        setAuthUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        throw new Error("Incorrect login information");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const checkAuth = async () => {
    try {
      const response = await apiClient.get("auth/check");
      setAuthUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Error in checkAuth:", error);
      setAuthUser(null);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("auth/logout");
      setAuthUser(null);
      setIsAuthenticated(false);
      disconnectSocket();
      toast.info("The user is logged out!");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    gender: string
  ) => {
    try {
      const randomUserResponse = await fetch(
        `https://randomuser.me/api/?gender=${gender}`
      );
      const data = await randomUserResponse.json();
      const avatar = data.results[0].picture.large;
      const response = await apiClient.post("/auth/signup", {
        fullName,
        email,
        password,
        avatar,
      });

      if (response.status === 201) {
        setAuthUser(response.data.user);
        setIsAuthenticated(true);
        connectSocket();
      } else {
        throw new Error("Incorrect registration data");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        checkAuth,
        authUser,
        logout,
        register,
        connectSocket,
        disconnectSocket,
        onlineUsers,
        socket,
        setSocket,
      }}
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
