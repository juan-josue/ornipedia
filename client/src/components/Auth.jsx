import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup, signout } from "../services/auth";

export default function Auth() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const data = await signup(email, password);
    setUser(data.user);
    navigate("/identification-flow");
  };

  const handleSignout = async () => {
    signout();
    setUser(null);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
    }
  }, [user]);

  return (
    <div>
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
      <button onClick={handleSignup}>Click me</button>
      {user ? (
        <button onClick={handleSignout}>Sign tf out</button>
      ) : (
        <span>Logged tf out</span>
      )}
    </div>
  );
}
