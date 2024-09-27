import { getSupabaseServerAdmin } from "@/utils/supabase/server";

interface returnType {
  success: boolean;
  message: string;
}

/**
 * This function deletes the user with the given userId
 *
 * @param {string} userId - the id of the user to delete
 * @returns {Object}
 * @property {boolean} success - whether the deletion was successful
 * @property {string} message - an error message if the deletion was successful or not
 */

export async function deleteAccount(
  userId: string,
): Promise<returnType | undefined> {
  try {
    const supabaseServerAdmin = getSupabaseServerAdmin();
    const { error } = await supabaseServerAdmin.auth.admin.deleteUser(userId);

    if (error) {
      console.error(error);
      return { success: false, message: error.message };
    } else {
      return { success: true, message: "User deleted successfully" };
    }
  } catch (error) {
    console.error(error);
  }
}
