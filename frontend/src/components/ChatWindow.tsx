import React from "react";
import { useMessages } from "../context/MessagesContext";
import { useAuth } from "../context/AuthContext";

const ChatWindow = () => {
  const { receiverMessages } = useMessages();
  const { authUser } = useAuth();

  return (
    <div className="flex flex-col h-[calc(100vh-400px)] overflow-y-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Küldött üzenetek */}
        {receiverMessages
          .filter((msg) => msg.senderId === authUser!.id)
          .map((msg) => (
            <div key={msg.id} className="chat chat-start">
              <div className="chat-bubble max-w-[70%]">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

        {/* Fogadott üzenetek */}
        {receiverMessages
          .filter((msg) => msg.senderId !== authUser!.id)
          .map((msg) => (
            <div key={msg.id} className="chat chat-end">
              <div className="chat-bubble max-w-[70%]">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatWindow;
