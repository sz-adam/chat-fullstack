import React from "react";
import LoggedInUser from "./LoggedInUser";
import { User } from "../model/UserModel";
import { IoMdClose } from "react-icons/io";

type Props = {
  loggedInUser: User[];
  isMenuOpen: boolean;
  toggleMenu: () => void;
  setSelectedReceiver: React.Dispatch<React.SetStateAction<number | null>>;
  selectedUserData?: User | undefined;
};

function MobilMenu({
  loggedInUser,
  toggleMenu,
  isMenuOpen,
  setSelectedReceiver,
  selectedUserData,
}: Props) {
  return (
    <div
      className={`z-10  absolute top-0 left-[-6%] bg-gray-800 rounded-2xl w-full h-screen transition-transform transform ${
        isMenuOpen ? "translate-x-5" : "-translate-x-full"
      } lg:hidden p-4`}
    >
      <button
        onClick={toggleMenu}
        className="text-white absolute top-4 right-4"
      >
        <IoMdClose className="text-3xl  cursor-pointer animate-bounce" />
      </button>
      <h3 className="text-2xl text-white mb-4">Users List</h3>
      <div className="space-y-4">
        {loggedInUser.map((loggedIn) => (
          <LoggedInUser
            key={loggedIn.id}
            loggedInUser={loggedIn}
            setSelectedReceiver={setSelectedReceiver}
            toggleMenu={toggleMenu}
            selectedUserData={selectedUserData}
          />
        ))}
      </div>
    </div>
  );
}

export default MobilMenu;
