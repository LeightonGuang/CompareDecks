"use server";
import { getSupabaseServer } from "@/utils/supabase/server";

/**
 * Validates the new password
 *
 * @param {string} newPassword - The new password of the user
 * @returns {Object}
 * @property {any} passwordValidationErrors - The validation errors
 * @property {boolean} hasPasswordValidationErrors - Whether there are any validation errors
 */

const validateNewPassword = (newPassword: string) => {
  const passwordValidationErrors = {
    hasEmptyPasswordError: newPassword === "",
    hasWhiteSpaceError: newPassword.includes(" "),
    hasAlphaNumericError:
      !newPassword.match(/\d/) || !newPassword.match(/[a-zA-Z]/),
    isPasswordLengthError: newPassword.length < 8,
  };

  const hasPasswordValidationErrors: boolean = Object.values(
    passwordValidationErrors,
  ).some((error) => error);

  return { passwordValidationErrors, hasPasswordValidationErrors };
};

/**
 * Updates the password of the user
 *
 * @param newPassword - The new password of the user
 *
 * @returns {Object} - An object containing the success status of the update and any errors that occurred.
 * @property {boolean} success - Whether the update was successful
 * @property {any} passwordValidationErrors - The validation errors
 * @property {any} supabaseError - Any errors that occurred during the supabase update
 */

export async function updatePassword(newPassword: string): Promise<{
  success: boolean;
  passwordValidationErrors: any;
  supabaseError: any;
}> {
  const { passwordValidationErrors, hasPasswordValidationErrors } =
    validateNewPassword(newPassword);

  if (hasPasswordValidationErrors) {
    return { success: false, passwordValidationErrors, supabaseError: null };
  } else if (!hasPasswordValidationErrors) {
    return { success: true, passwordValidationErrors, supabaseError: null };
  }

  try {
    // Make sure user is authenticated before updating the password
    const supabaseServer = getSupabaseServer();
    const { data: user, error: getUserError } =
      await supabaseServer.auth.getUser();

    if (getUserError) {
      return {
        success: false,
        passwordValidationErrors: null,
        supabaseError: getUserError.message,
      };
    }

    const { error: updateUserError } = await supabaseServer.auth.updateUser({
      password: newPassword,
    });

    if (updateUserError) {
      console.log("Supabase SignOut Error: " + updateUserError.message);
      return {
        success: false,
        passwordValidationErrors: updateUserError,
        supabaseError: updateUserError,
      };
    } else {
      return {
        success: true,
        passwordValidationErrors,
        supabaseError: updateUserError,
      };
    }
  } catch (error) {
    console.error("Error during password change: ", error);
    return { success: false, passwordValidationErrors, supabaseError: error };
  }
}
