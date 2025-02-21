import React, { useEffect } from "react";
import { User } from "../model/UserModel";
import { useMessages } from "../context/MessagesContext";
import { useAuth } from "../context/AuthContext";

type Props = {
  loggedInUser: User;
  setSelectedReceiver: React.Dispatch<React.SetStateAction<number | null>>;
  toggleMenu?: () => void;
  selectedUserData: User | undefined;
};

function LoggedInUser({
  loggedInUser,
  setSelectedReceiver,
  toggleMenu,
  selectedUserData,
}: Props) {
  const { fetchReceiverMessage } = useMessages();
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={`flex text-center items-center gap-4 p-2 glassmorphism rounded-xl hover:bg-white/20 transition-all m-2 cursor-pointer relative 
    ${
      selectedUserData?.id === loggedInUser.id ? "bg-blue-500 text-white" : ""
    }`}
      onClick={() => {
        fetchReceiverMessage(loggedInUser.id);
        setSelectedReceiver(loggedInUser.id);
        if (toggleMenu) toggleMenu();
      }}
    >
      {isAuthenticated && (
        <div className="avatar online">
          <div className="w-12 md:w-10 rounded-full">
            <img src={loggedInUser.profilePic} alt={loggedInUser.fullName} />
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <div className="avatar offline">
          <div className="w-12 md:w-10 rounded-full">
            <img src={loggedInUser.profilePic} alt={loggedInUser.fullName} />
          </div>
        </div>
      )}

      <h3 className="text-2xl font-semibold text-center">
        <div className="w-full items-end">
          {loggedInUser.fullName}
          {loggedInUser.unreadMessages > 0 && (
            <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full absolute top-2 right-2">
              {loggedInUser.unreadMessages}
            </span>
          )}
        </div>
      </h3>
    </div>
  );
}

export default LoggedInUser;
