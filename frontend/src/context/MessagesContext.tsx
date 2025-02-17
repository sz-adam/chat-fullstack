import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../model/UserModel";
import { apiClient } from "../lib/axios";
import { Message } from "../model/MessagesModel";

interface MessagesContextType {
  loggedInUser: User[];
  fetchLoggedInUsers: () => void;
  isOnline: boolean;
  receiverMessages: Message[];
  fetchReceiverMessage: (id: number) => void;
  fetchSendMessage: (id: number, message: string) => Promise<void>;
}

const UserContext = createContext<MessagesContextType | undefined>(undefined);

interface MessagesProviderProps {
  children: ReactNode;
}

const MessagesProvider: React.FC<MessagesProviderProps> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [receiverMessages, setReceiverMessages] = useState<Message[]>([]);

  const fetchLoggedInUsers = async () => {
    try {
      const response = await apiClient.get("/messages/users");
      setLoggedInUser(response.data);
    } catch (error) {
      console.log("An error occurred while loading users:", error);
    }
  };

  const fetchReceiverMessage = async (id: number) => {
    try {
      const receiverResponse = await apiClient.get(`/messages/${id}`);
      setReceiverMessages(receiverResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReceiverMessage;
  }, []);

  const fetchSendMessage = async (id: number, message: string) => {
    try {
      const response = await apiClient.post(`/messages/send/${id}`, {
        text: message,
      });

      console.log("Message sent:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        fetchLoggedInUsers,
        isOnline,
        receiverMessages,
        fetchReceiverMessage,
        fetchSendMessage,
      }}
    >
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
