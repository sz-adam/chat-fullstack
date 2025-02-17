import React, { useEffect } from "react";
import { User } from "../model/UserModel";
import { useMessages } from "../context/MessagesContext";

type Props = {
  loggedInUser: User;
  setSelectedReceiver: React.Dispatch<React.SetStateAction<number | null>>;
  selectedReceiver: number | null;
};

function LoggedInUser({
  loggedInUser,
  selectedReceiver,
  setSelectedReceiver,
}: Props) {
  const { isOnline, fetchReceiverMessage } = useMessages();

  return (
    <div
      className="flex text-center items-center gap-4 p-2 glassmorphism rounded-xl hover:bg-white/20 transition-all m-2 cursor-pointer"
      onClick={() => {
        fetchReceiverMessage(loggedInUser.id);
        setSelectedReceiver(loggedInUser.id);
      }}
    >
      {isOnline ? (
        <div className="avatar online">
          <div className="w-12 md:w-10 rounded-full">
            <img src={loggedInUser.profilePic} />
          </div>
        </div>
      ) : (
        <div className="avatar offline">
          <div className="w-12 md:w-10 rounded-full">
            <img src={loggedInUser.profilePic} />
          </div>
        </div>
      )}
      <h3 className="text-2xl font-semibold lg:text-slate-600 text-center">
        {loggedInUser.fullName}
      </h3>
    </div>
  );
}

export default LoggedInUser;
