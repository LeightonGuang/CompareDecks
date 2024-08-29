"use server";
import { SignupFormProps } from "@/_types/SignupFormProps";
import { createClient } from "@/utils/supabase/server";

const validateSignUpData = ({
  username,
  email,
  password,
  confirmPassword,
}: SignupFormProps) => {
  const data = {
    hasEmptyUsernameError: username === "",
    hasEmptyEmailError: email === "",
    hasEmptyPasswordError: password === "",
    hasWhiteSpaceError: password.includes(" "),
    hasAlphaNumericError: !password.match(/\d/) || !password.match(/[a-zA-Z]/),
    isPasswordLengthError: password.length < 8,
    hasEmptyConfirmPasswordError: confirmPassword === "",
    isPasswordMatchError: password !== confirmPassword,
  };

  const hasValidationErrors: boolean = Object.values(data).some(
    (error) => error,
  );
  return { data, hasValidationErrors };
};

export async function signUp(
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) {
  // type-casting here for convenience

  // in practice, you should validate your inputs
  const { data, hasValidationErrors } = validateSignUpData({
    username,
    email,
    password,
    confirmPassword,
  });

  if (hasValidationErrors) {
    return { success: false, errors: data };
  } else if (!hasValidationErrors) {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Supabase sign up error: " + error.message);
      throw new Error(error.message);
    } else {
      console.log("Sign up successful");
      return { success: true };
    }
  }
}
