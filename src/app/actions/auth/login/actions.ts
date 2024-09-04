"use server";
import { createClient } from "@/utils/supabase/server";

/**
 * This function logs in the user with the given email and password using Supabase
 *
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @returns {Object}
 * @property {string} error - Only returned if there is an error
 */

export async function login(email: string, password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.log("Supabase signIn Error: " + error.message);
    return { error: error.message };
  }
}
