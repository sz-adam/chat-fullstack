import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HomePage from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { BiLoaderAlt } from "react-icons/bi";
import MainNavigation from "../components/MainNavigation";


const Navigation = () => {
  const { authUser, checkAuth, isAuthenticated } = useAuth();
  useEffect(() => {
    checkAuth();
  }, [authUser]);
  

   if (isAuthenticated && !authUser)
     return (
       <div className="flex items-center justify-center h-screen">
         <BiLoaderAlt className="size-32 text-blue-500 animate-spin" />
       </div>
     );

  return (
    <div>
      {authUser ? <MainNavigation /> : ""}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/registration"
            element={!authUser ? <RegisterPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Navigation;
