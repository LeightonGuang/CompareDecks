import { NextResponse } from "next/server";
import { login } from "@/app/actions/auth/login/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const error = await login(email, password);

    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Login API error: " + error);

    return NextResponse.json(
      { message: `Error logging in: ${error}` },
      { status: 500 },
    );
  }
}
