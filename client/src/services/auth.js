import { supabase } from "./supabaseClient";

export async function signup(email, password) {
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

    return data;
  }
}

export async function signin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error.message);
  }

  localStorage.setItem("uid", data.user.id);

  return data;
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    localStorage.clear("user");
  }
}
