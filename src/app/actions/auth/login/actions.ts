"use server";
import { supabaseServer } from "@/utils/supabase/server";

/**
 * This function logs in the user with the given email and password using Supabase
 *
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @returns {string} error.message - Return error message if there is an error
 */

export async function login(email: string, password: string) {
  const loginCredentials = {
    email,
    password,
  };

  const { error } =
    await supabaseServer.auth.signInWithPassword(loginCredentials);

  if (error) {
    console.error(error.message);
    return error.message;
  }
}
