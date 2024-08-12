import { NextResponse } from "next/server";
import { login } from "@/app/login/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    await login(email, password);
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Login API error: " + error);

    return NextResponse.json(
      { message: `Error logging in: ${error}` },
      { status: 500 },
    );
  }
}
