"use server";
import { createClient } from "@/utils/supabase/server";

export async function passwordChange(newPassword: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    console.log("Supabase SignOut Error: " + error.message);
    throw new Error(error.message);
  }
}
