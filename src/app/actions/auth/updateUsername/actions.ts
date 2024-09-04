import { createAdminClient } from "@/utils/supabase/server";

/**
 * This function updates the username of the user
 *
 * @param {string} userId - the id of the user
 * @param {string} newUsername - the new username
 * @returns {Object} - the response object
 * @property {boolean} success - whether the update was successful
 * @property {string} message - the message
 */

export async function updateUsername(userId: string, newUsername: string) {
  const supabase = createAdminClient();
  try {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: {
        name: newUsername,
        full_name: newUsername,
      },
    });
    if (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: true,
        message: "Username updated successfully",
      };
    }
  } catch (error) {
    console.error(error);
  }
}
