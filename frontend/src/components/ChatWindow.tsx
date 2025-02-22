import React, { useState } from "react";
import { useMessages } from "../context/MessagesContext";
import { useAuth } from "../context/AuthContext";
import { MdClose } from "react-icons/md";

const ChatWindow = () => {
  const { receiverMessages, deleteMessage } = useMessages();
  const { authUser } = useAuth();
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );

  // Időrendbe való rendezés
  const sortedMessages = [...receiverMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  //bezárja a dátumot és a törlést
  const handleMessageClick = (msgId: number) => {
    setSelectedMessageId((prevId) => (prevId === msgId ? null : msgId));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-400px)] overflow-y-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4">
        {sortedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${
              msg.senderId === authUser!.id ? "chat-end" : "chat-start"
            }`}
          >
            <div
              onClick={() => handleMessageClick(msg.id)}
              className="chat-bubble max-w-[70%] cursor-pointer relative "
            >
              <p>{msg.text}</p>
              {selectedMessageId === msg.id && (
                <div>
                  <span className="text-xs text-gray-500 block mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                  {/**Csak a saját üzeneteimnél jelenik meg a törlés funkció */}
                  {msg.senderId === authUser!.id && (
                    <button
                      onClick={(e) => {
                        deleteMessage(msg.id);
                      }}
                      className="absolute top-[-18px] right-[-10px] text-red-500 p-1 text-2xl"
                    >
                      <MdClose />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
