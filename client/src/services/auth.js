import { supabase } from "./supabaseClient";

export async function signup(email, password) {
  const { data, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (signUpError) {
    console.error("Error signing user up:", signUpError.message);
    throw new Error(`Error signing user up: ${signUpError.message}`);
  }

  localStorage.setItem("uid", data.user.id);

  const { error: insertError } = await supabase.from("users").insert({
    id: data.user.id,
  });

  if (insertError) {
    console.error("Error signing user up:", insertError.message);
    throw new Error(`Error signing user up: ${insertError.message}`);
  }

  return data;
}

export async function signin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Error signing user in:", error.message);
    throw new Error(`Error signing user in: ${error.message}`);
  }

  localStorage.setItem("uid", data.user.id);

  return data;
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing user out:", error.message);
    throw new Error(`Error signing user out: ${error.message}`);
  }
  localStorage.clear("user");
}
