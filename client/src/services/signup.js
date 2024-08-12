import { supabase } from "./supabaseClient";

export const signup = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    console.log("Failed sign up", error);
  } else {
    return data;
  }
};
