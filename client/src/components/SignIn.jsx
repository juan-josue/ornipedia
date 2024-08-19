import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signin } from "../services/auth";
import dashboardImage from "../assets/images/screenshot.jpg";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    await signin(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="h-screen overflow-hidden bg-base-100">
      {/* navbar */}
      <div className="navbar fixed bg-base-100 border-b-2 border-secondary">
        <div className="flex">
          <a
            className="btn btn-ghost text-xl"
            onClick={() => {
              navigate("/");
            }}
          >
            Ornipedia
          </a>
        </div>
      </div>

      {/* body */}
      <div className="grid grid-rows-1 grid-cols-2 h-full">
        {/* sign up form column */}
        <div className="h-full flex flex-col gap-[32px] justify-center items-center border-r-2 border-secondary">
          <article className="prose w-[600px]">
            <h1>Got any new finds?</h1>
            <p>
              Welcome back, we're excited to see what you've found.
            </p>
          </article>
          <div className="flex flex-col gap-[16px] w-[600px]">
            <label className="input input-bordered flex items-center gap-2">
              Email
              <input
                type="text"
                className="grow"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Password
              <input
                type="password"
                className="grow"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <button className="btn btn-primary" onClick={handleSignin}>
              Sign In
            </button>
            <p>
              Don't have an account?{" "}
              <a
                className="link link-hover"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* mockup image column */}
        <div className="h-full flex flex-col justify-center items-center">
          <div className="mockup-browser bg-base-300 border border-secondary w-[600px] h-[338px]">
            <div className="mockup-browser-toolbar">
              <div className="input">https://ornipedia.ca</div>
            </div>
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url(${dashboardImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
