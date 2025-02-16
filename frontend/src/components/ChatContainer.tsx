import React, { useEffect, useState } from "react";
import { useMessages } from "../context/MessagesContext";
import LoggedInUser from "./LoggedInUser";
import { RiMenu3Line } from "react-icons/ri";
import MobilMenu from "./MobilMenu";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { loggedInUser, fetchLoggedInUsers } = useMessages();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
            <LoggedInUser key={loggedIn.id} loggedInUser={loggedIn} />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[70%] p-4 overflow-auto border-l">
        <ChatWindow />
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
