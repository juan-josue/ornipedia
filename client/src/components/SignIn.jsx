import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signin } from "../services/auth";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    await signin(email, password);
    navigate("/dashboard");
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
      <button onClick={handleSignin}>Sign In</button>
    </div>
  );
}

