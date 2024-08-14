"use server";

import { NextResponse } from "next/server";
import { signUp } from "@/app/signup/actions";

import { SignupFormProps } from "@/_types/SignupFormProps";

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

  const hasErrors = Object.values(errors).some((error) => error);
  return { errors, hasErrors };
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password, confirmPassword } = body;

    const { errors, hasErrors } = validateSignUpData({
      username,
      email,
      password,
      confirmPassword,
    });

    if (hasErrors) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    await signUp(email, password);
    return NextResponse.json(
      { message: "Sign up successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Sign up API error: ", error);

    return NextResponse.json(
      { message: `Error Signing up: ${error}` },
      { status: 500 },
    );
  }
}
