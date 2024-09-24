"use server";
import { supabaseServer } from "@/utils/supabase/server";

/**
 * This function logs the user out using Supabase
 *
 * @throws {Error} - If there is an error signing the user out
 * @returns {void}
 */

export async function logout() {
  const { error } = await supabaseServer.auth.signOut();

  if (error) {
    console.log("Supabase SignOut Error: " + error.message);
    throw new Error(error.message);
  }
}
