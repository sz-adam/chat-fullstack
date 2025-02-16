import React, { useState } from "react";
import InputBox from "./InputBox";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log(message);
    setMessage("");
  };

  return (
    <div className="flex items-center mt-4">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type a message..."
        className="flex-1 input input-bordered input-info"
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
