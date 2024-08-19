import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../services/auth";
import dashboardImage from "../assets/images/screenshot.jpg";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await signup(email, password);
    navigate("/identification-flow");
  };

  return (
    <div className="h-screen overflow-hidden bg-base-100">

      {/* navbar */}
      <div className="navbar fixed bg-base-100 border-b-2 border-secondary">
        <div className="flex">
          <a className="btn btn-ghost text-xl" onClick={() => {navigate('/')}}>
            Ornipedia
          </a>
        </div>
      </div>

      {/* body */}
      <div className="grid grid-rows-1 grid-cols-2 h-full">

        {/* sign up form column */}
        <div className="h-full flex flex-col gap-[32px] justify-center items-center border-r-2 border-secondary">
          <article className="prose w-[600px]">
            <h1>Let's get you started.</h1>
            <p>
              Identify birds instantly, learn fascinating facts about them, and
              track your sightings on an interactive map with Ornipedia.
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
            <button className="btn btn-primary" onClick={handleSignup}>
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <a className="link link-hover" onClick={() => {navigate('/signin')}}>Sign In</a>
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
