import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RegisterPage = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await register(fullName, email, password, gender);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex w-96 flex-col space-y-5 rounded-2xl glassmorphism px-5 py-10 shadow-xl sm:mx-auto">
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-center text-3xl font-bold">Registration</h1>
            <p>Registration to access your account</p>
          </div>

          <InputBox
            id="name"
            type="text"
            label="Enter Your Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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

          {/* Gender selection */}
          <div className="flex items-center justify-center space-x-3">
            <label htmlFor="male" className="flex items-center">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                className="mr-2"
              />
              Male
            </label>
            <label htmlFor="female" className="flex items-center">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                className="mr-2"
              />
              Female
            </label>
          </div>

          <div className="flex w-full items-center justify-center">
            <button className="shrink-0 inline-block w-36 rounded-lg bg-blue-600 py-3 font-bold text-white">
              Registration
            </button>
          </div>
          <p className="text-center">
            Don't have an account?&nbsp;
            <Link
              to="/login"
              className="whitespace-nowrap font-semibold hover:underline text-blue-900"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
