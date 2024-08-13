import { NextResponse } from "next/server";
import { signUp } from "@/app/signup/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    await signUp(email, password);
    return NextResponse.json(
      { message: "Sign up successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: `Error Signing up: ${error}` },
      { status: 500 },
    );
  }
}
