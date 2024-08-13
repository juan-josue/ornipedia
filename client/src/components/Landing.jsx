import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-3xl text-cyan-200 font-bold underline">Landing</h1>
      <button
        onClick={() => {
          navigate("/signin");
        }}
      >
        Sign In
      </button>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign Up
      </button>
    </div>
  );
}
