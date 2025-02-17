import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useMessages } from "../context/MessagesContext";

interface MessageInputProps {
  receiverId: number | null;
}

const MessageInput = ({ receiverId }: MessageInputProps) => {
  const [sendMessage, setSendMessage] = useState("");
  const { fetchSendMessage } = useMessages();

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!sendMessage.trim() || !receiverId) return;

    try {
      await fetchSendMessage(receiverId, sendMessage);
      setSendMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex items-center mt-4">
      <input
        type="text"
        value={sendMessage}
        onChange={(e) => setSendMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 input input-bordered input-info text-black"
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 btn btn-info transition duration-300"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
