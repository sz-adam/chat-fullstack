import React from "react";

const ChatWindow = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-350px)] overflow-y-auto  p-4 ">
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Üzenetek */}
        <div className="flex chat chat-start">
          <div className="chat-bubble max-w-[70%]">
            <p>Hello, how are you?</p>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble max-w-[70%]">
            <p>I'm good, thanks! And you?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
