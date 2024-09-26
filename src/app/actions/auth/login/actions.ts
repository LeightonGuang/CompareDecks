"use server";
import { getSupabaseServer } from "@/utils/supabase/server";

/**
 * This function logs in the user with the given email and password using Supabase
 *
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @returns {Object} - Returns an object with either error or the user/session data
 * @property {string} error - The error message if there is an error
 * @property {Object} data - The user and session data if the login is successful
 */

export async function login(email: string, password: string) {
  const loginCredentials = {
    email,
    password,
  };

  const supabaseServer = getSupabaseServer();
  const { data, error } =
    await supabaseServer.auth.signInWithPassword(loginCredentials);

  if (error) {
    console.error("Login failed:", error.message);
    return { data: null, error: error.message };
  }

  return { data: { user: data.user, session: data.session }, error: null };
}
