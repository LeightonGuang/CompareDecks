import { NextResponse } from "next/server";
import { logout } from "@/app/actions/auth/logout/actions";

export async function POST() {
  try {
    await logout(); // Call the server-side logout function
    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.error("Logout API error: " + error);

    return NextResponse.json(
      { message: `Error logging out: ${error}` },
      { status: 500 },
    ); // Respond with an error if something goes wrong
  }
}
