"use server";

import { NextResponse } from "next/server";
import { signUp } from "@/app/signup/actions";
import { updateUsername } from "@/app/updateUsername/actions";

/**
 * This function is called when signUpWithEmail is called in UserContext.tsx
 *
 * @param request request object {Username, Email, Password, confirmPassword}
 * @returns errors object and status code
 */

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { username, email, password, confirmPassword } = body;

    const { data, success, errors } = await signUp(
      username,
      email,
      password,
      confirmPassword,
    );

    console.table(errors);

    if (!success) {
      return NextResponse.json(errors, { status: 400 });
    }

    // return user id
    const userId = data?.user?.id;

    if (userId !== undefined) {
      await updateUsername(userId, username);
    } else {
      console.error("User ID is undefined");
      return NextResponse.json(errors, { status: 400 });
    }

    return NextResponse.json(errors, { status: 200 });
  } catch (error) {
    console.error("Sign up API error: ", error);

    return NextResponse.json(
      { message: `Error signing up: ${error}` },
      { status: 500 },
    );
  }
}
