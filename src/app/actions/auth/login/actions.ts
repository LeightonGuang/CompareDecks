"use server";
import { createClient } from "@/utils/supabase/server";

export async function login(email: string, password: string) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.log("Supabase signIn Error: " + error.message);
    return { error: error.message };
  }
}
