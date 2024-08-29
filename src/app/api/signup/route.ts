"use server";

import { NextResponse } from "next/server";
import { signUp } from "@/app/signup/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password, confirmPassword } = body;

    const result = await signUp(username, email, password, confirmPassword);

    console.log("result: ", result);

    if (!result?.success) {
      return NextResponse.json(result, { status: 400 });
    }

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
