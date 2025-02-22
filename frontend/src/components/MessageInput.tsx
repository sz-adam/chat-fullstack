import React, { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useMessages } from "../context/MessagesContext";

interface MessageInputProps {
  receiverId: number | null;
}

const MessageInput = ({ receiverId }: MessageInputProps) => {
  const [sendMessage, setSendMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { fetchSendMessage } = useMessages();

  const handleSendMessage = async (
    event: React.FormEvent | React.KeyboardEvent
  ) => {
    event.preventDefault();
    if (!sendMessage.trim() || !receiverId) return;

    try {
      await fetchSendMessage(receiverId, sendMessage);
      setSendMessage("");
      setShowPicker(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const addEmoji = (emojiData: EmojiClickData) => {
    setSendMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative flex items-center mt-4">
      <div className="relative flex items-center flex-1">
        <input
          type="text"
          value={sendMessage}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
          onChange={(e) => setSendMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 input input-bordered input-info text-black pr-6"
        />

        <button
          onClick={() => setShowPicker((prev) => !prev)}
          className="absolute right-2 "
        >
          😊
        </button>
      </div>

      <button
        onClick={handleSendMessage}
        className="ml-2 btn btn-info transition duration-300"
      >
        Send
      </button>

      {showPicker && (
        <div className="absolute bottom-14 right-0 sm:right-8 w-full sm:w-auto sm:max-w-xs">
          <EmojiPicker onEmojiClick={addEmoji} className="text-2xl" />
        </div>
      )}
    </div>
  );
};

export default MessageInput;
