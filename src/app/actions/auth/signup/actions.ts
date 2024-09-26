"use server";
import { SignupFormProps } from "@/_types/SignupFormProps";
import { getSupabaseServer } from "@/utils/supabase/server";

/**
 * This function validates the signup data
 *
 * @param {string} username - The name of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @param {string} confirmPassword - The confirm password of the user
 *
 * @returns {errors, hasValidationErrors} - The validation errors and whether there are any validation errors
 */

const validateSignUpData = ({
  username,
  email,
  password,
  confirmPassword,
}: SignupFormProps) => {
  const errors = {
    hasEmptyUsernameError: username === "",
    hasEmptyEmailError: email === "",
    hasEmptyPasswordError: password === "",
    hasWhiteSpaceError: password.includes(" "),
    hasAlphaNumericError: !password.match(/\d/) || !password.match(/[a-zA-Z]/),
    isPasswordLengthError: password.length < 8,
    hasEmptyConfirmPasswordError: confirmPassword === "",
    isPasswordMatchError: password !== confirmPassword,
  };

  const hasValidationErrors: boolean = Object.values(errors).some(
    (error) => error,
  );
  return { errors, hasValidationErrors };
};

/**
 * This function signs up the user
 *
 * @param username
 * @param email
 * @param password
 * @param confirmPassword
 * @return {Object}
 * @property {any} data - Only if the sign up was successful
 * @property {boolean} success - Whether the sign up was successful
 * @property {any} errors - The validation errors object
 */

export async function signUp(
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
): Promise<{ data: any; success: boolean; errors: any }> {
  const { errors, hasValidationErrors } = validateSignUpData({
    username,
    email,
    password,
    confirmPassword,
  });

  if (hasValidationErrors) {
    return { data: null, success: false, errors };
  } else if (!hasValidationErrors) {
    const supabaseServer = getSupabaseServer();
    const { data, error } = await supabaseServer.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Supabase sign up error: " + error.message);
      return { data: null, success: false, errors };
    }

    console.log("Sign up successful");
    return { data: data, success: true, errors };
  } else {
    return { data: null, success: false, errors };
  }
}
