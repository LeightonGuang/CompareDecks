import { NextResponse } from "next/server";
import { passwordChange } from "@/app/passwordChange/actions";

export async function POST() {
  try {
    // Call the server-side logout function
    await passwordChange();
    return NextResponse.json(
      { message: "Password change successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Password change API error: " + error);
    // Respond with an error if something goes wrong
    return NextResponse.json(
      { message: `Password change error: ${error}` },
      { status: 500 },
    );
  }
}
