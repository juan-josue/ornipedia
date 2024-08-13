import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      Landing Page
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
