import React from "react";
import InputBox from "../components/InputBox";
import { Link } from "react-router-dom";

function LoginPage() {
 
  return (
    <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className=" flex w-96 flex-col space-y-5 rounded-2xl backdrop-blur bg-white/10 px-5 py-10 shadow-xl sm:mx-auto">
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-center text-3xl font-bold ">Login</h1>
          <p>Login to access your account</p>
        </div>

        <InputBox id="email" type="text" label="Enter Your Email" />
        <InputBox id="password" type="password" label="Enter Your Password" />

        <div className="flex w-full items-center justify-center">
          <button className="shrink-0 inline-block w-36 rounded-lg bg-blue-600 py-3 font-bold text-white">
            Login
          </button>
        </div>
        <p className="text-center">
          Don't have an account?&nbsp;
          <Link
            to="/signin"
            className="whitespace-nowrap font-semibold hover:underline text-blue-900"
          >
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
