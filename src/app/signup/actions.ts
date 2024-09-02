"use server";
import { SignupFormProps } from "@/_types/SignupFormProps";
import { createClient } from "@/utils/supabase/server";

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
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Supabase sign up error: " + error.message);
      throw new Error(error.message);
    } else {
      console.log("Sign up successful");
      return { data: data, success: true, errors };
    }
  } else {
    return { data: null, success: false, errors };
  }
}
