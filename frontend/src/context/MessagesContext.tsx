import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../model/UserModel";
import { apiClient } from "../lib/axios";
import { Message } from "../model/MessagesModel";
import { useAuth } from "./AuthContext";

interface MessagesContextType {
  loggedInUser: User[];
  fetchLoggedInUsers: () => void;
  receiverMessages: Message[];
  fetchReceiverMessage: (id: number) => void;
  fetchSendMessage: (id: number, message: string) => Promise<void>;
  deleteMessage: (id: number) => Promise<void>;
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
}

const userMessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

interface MessagesProviderProps {
  children: ReactNode;
}

const MessagesProvider: React.FC<MessagesProviderProps> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User[]>([]);
  const [receiverMessages, setReceiverMessages] = useState<Message[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { socket } = useAuth();

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
      const response = await apiClient.get(`/messages/${id}`);
      setReceiverMessages(response.data);
      setSelectedUserId(id);
      fetchLoggedInUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      await apiClient.delete(`/messages/delete/${id}`);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const fetchSendMessage = async (id: number, message: string) => {
    try {
      const response = await apiClient.post(`/messages/send/${id}`, {
        text: message,
      });

      const newMessage = response.data;

      // Ellenőrizzük, hogy az üzenet az aktuális beszélgetőpartnerhez tartozik-e
      if (newMessage.receiverId === selectedUserId) {
        setReceiverMessages((prev) => [...prev, newMessage]);
      }

      socket?.emit("sendMessage", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  //aktív kapcsolat
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage: Message) => {
        if (newMessage.senderId === selectedUserId) {
          setReceiverMessages((prev) => [...prev, newMessage]);
        } else{
          fetchLoggedInUsers();          
        }
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, selectedUserId]);

  return (
    <userMessagesContext.Provider
      value={{
        loggedInUser,
        fetchLoggedInUsers,
        receiverMessages,
        fetchReceiverMessage,
        fetchSendMessage,
        deleteMessage,
        selectedUserId,
        setSelectedUserId,
      }}
    >
      {children}
    </userMessagesContext.Provider>
  );
};

const useMessages = (): MessagesContextType => {
  const context = React.useContext(userMessagesContext);
  if (!context) {
    throw new Error("Messages must be used within a MessagesProvider");
  }
  return context;
};

export { MessagesProvider, useMessages };
