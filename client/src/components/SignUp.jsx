import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../services/auth";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await signup(email, password);
    navigate("/identification-flow");
  };

  return (
    <div>
      {" "}
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
