"use server";
import { createClient } from "@/utils/supabase/server";

/**
 * This function logs the user out using Supabase
 *
 * @throws {Error} - If there is an error signing the user out
 * @returns {void}
 */

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Supabase SignOut Error: " + error.message);
    throw new Error(error.message);
  }
}
