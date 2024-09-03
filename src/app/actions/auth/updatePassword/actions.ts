"use server";
import { createClient } from "@/utils/supabase/server";

export async function updatePassword(newPassword: string) {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      console.log("Supabase SignOut Error: " + error.message);
      return { success: false, error: error.message };
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error("Error during password change: ", error);
  }
}
