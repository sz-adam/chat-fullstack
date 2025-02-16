import React from "react";
import { User } from "../model/UserModel";
import { useMessages } from "../context/MessagesContext";

type Props = {
  loggedInUser: User;
};

function LoggedInUser({ loggedInUser }: Props) {
  const { isOnline } = useMessages();

  return (
    <div className="flex text-center items-center gap-4 p-2 glassmorphism rounded-xl hover:bg-white/20 transition-all m-2 cursor-pointer overflow-auto">
      {isOnline ? (
        <div className="avatar online">
          <div className="w-12 md:w-14 rounded-full">
            <img src={loggedInUser.profilePic} />
          </div>
        </div>
      ) : (
        <div className="avatar offline">
          <div className="w-12 md:w-14 rounded-full">
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
