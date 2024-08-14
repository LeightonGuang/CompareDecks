"use server";
import { createClient } from "@/utils/supabase/server";

export async function signUp(email: string, password: string) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error("Supabase sign up error: " + error.message);
    throw new Error(error.message);
  } else {
    console.log("Sign up successful");
  }
}
