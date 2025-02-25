import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password);
      toast.success("Successful login!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className=" flex w-96 flex-col space-y-5 rounded-2xl glassmorphism px-5 py-10 shadow-xl sm:mx-auto">
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-center text-3xl font-bold ">Login</h1>
            <p>Login to access your account</p>
          </div>

          <InputBox
            id="email"
            type="text"
            label="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            id="password"
            type="password"
            label="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex w-full items-center justify-center">
            <button className="shrink-0 inline-block w-36 rounded-lg bg-blue-600 py-3 font-bold text-white">
              Login
            </button>
          </div>
          <p className="text-center">
            Don't have an account?&nbsp;
            <Link
              to="/registration"
              className="whitespace-nowrap font-semibold hover:underline text-blue-900"
            >
              Registration
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
