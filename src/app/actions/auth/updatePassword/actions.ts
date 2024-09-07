"use server";
import { createClient } from "@/utils/supabase/server";

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

  const supabase = createClient();

  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      console.log("Supabase SignOut Error: " + error.message);
      return {
        success: false,
        passwordValidationErrors: error,
        supabaseError: error,
      };
    } else {
      return { success: true, passwordValidationErrors, supabaseError: error };
    }
  } catch (error) {
    console.error("Error during password change: ", error);
    return { success: false, passwordValidationErrors, supabaseError: error };
  }
}
