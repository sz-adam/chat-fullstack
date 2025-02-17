import React, { useEffect, useState } from "react";
import { useMessages } from "../context/MessagesContext";
import LoggedInUser from "./LoggedInUser";
import { RiMenu3Line } from "react-icons/ri";
import MobilMenu from "./MobilMenu";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";

import { LuMessageSquare } from "react-icons/lu";


const ChatContainer = () => {
  const { loggedInUser, fetchLoggedInUsers, receiverMessages } = useMessages();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedReceiver, setSelectedReceiver] = useState<number | null>(null);

  useEffect(() => {
    fetchLoggedInUsers();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-[90%] mx-auto p-2 glassmorphism rounded-2xl flex flex-col lg:flex-row ">
      <div className="w-full lg:w-[30%]  p-4 text-center ">
        <div className="flex w-full items-center justify-center mb-4 ">
          <h2 className="text-3xl font-bold  text-center">Users</h2>
          <div className="flex justify-end w-full lg:hidden">
            <RiMenu3Line
              onClick={toggleMenu}
              className="text-3xl  cursor-pointer"
            />
          </div>
        </div>
        <MobilMenu
          isMenuOpen={isMenuOpen}
          loggedInUser={loggedInUser}
          toggleMenu={toggleMenu}
        />

        <div className="hidden lg:block">
          {loggedInUser.map((loggedIn) => (
            <div key={loggedIn.id}>
              <LoggedInUser
                loggedInUser={loggedIn}
                selectedReceiver={selectedReceiver}
                setSelectedReceiver={setSelectedReceiver}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[70%] p-4 overflow-auto border-l">
        {receiverMessages.length !== 0 ? (
          <>
            <ChatWindow />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] text-xl font-semibold  rounded-lg shadow-lg p-6">
            <LuMessageSquare className="text-9xl animate-bounce" />
            <p className="mt-2"> Sorry, there are no messages yet</p>
          </div>
        )}
        <MessageInput receiverId={selectedReceiver} />
      </div>
    </div>
  );
};

export default ChatContainer;
