import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../model/UserModel";
import { apiClient } from "../lib/axios";

interface MessagesContextType {
  loggedInUser: User[];
  fetchLoggedInUsers: () => void;
}

const UserContext = createContext<MessagesContextType | undefined>(undefined);

interface MessagesProviderProps {
  children: ReactNode;
}

const MessagesProvider: React.FC<MessagesProviderProps> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User[]>([]);

  const fetchLoggedInUsers = async () => {
    try {
      const response = await apiClient.get("/messages/users");     
      setLoggedInUser(response.data); 
    } catch (error) {
      console.log("An error occurred while loading users:", error);
    }
  };

  useEffect(() => {
    fetchLoggedInUsers();
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, fetchLoggedInUsers }}>
      {children}
    </UserContext.Provider>
  );
};

const useMessages = (): MessagesContextType => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("Messages must be used within a MessagesProvider");
  }
  return context;
};

export { MessagesProvider, useMessages };
