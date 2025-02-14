import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const MainNavigation = () => {
  const { logout, authUser } = useAuth();
  useEffect(() => {
    console.log(authUser);
  }, []);
  return (
    <div>
      <div className="navbar text-slate-500">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Chat App</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <div>{authUser?.fullName}</div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={authUser?.profilePic}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
