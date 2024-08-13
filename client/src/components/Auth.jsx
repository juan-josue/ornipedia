import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { supabase } from "../services/supabaseClient";

export default function Auth() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log("Failed sign up", error);
    } else {
      console.log("Successful sign up", data);
      localStorage.setItem("uid", data.user.id);

      const { error: insertError } = await supabase.from("users").insert({
        id: data.user.id,
      });

      if (insertError) {
        console.error(
          "Error inserting user into customer_users table:",
          insertError
        );
      }

      setUser(data.user);

      navigate("/identification-flow");
    }
  };

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.clear("user");
      setUser(null);
    }
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
      <button onClick={signup}>Click me</button>
      {user ? (
        <button onClick={signout}>Sign tf out</button>
      ) : (
        <span>Logged tf out</span>
      )}
    </div>
  );
}
