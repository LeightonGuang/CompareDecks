import { NextResponse } from "next/server";
import { logout } from "@/app/logout/actions";

export async function POST() {
  try {
    await logout(); // Call the server-side logout function
    return NextResponse.json({ message: "Logout successful" });
  } catch (error) {
    return NextResponse.error(); // Respond with an error if something goes wrong
  }
}
