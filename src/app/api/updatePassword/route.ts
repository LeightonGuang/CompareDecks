import { NextResponse } from "next/server";
import { updatePassword } from "@/app/actions/auth/updatePassword/actions";

export async function POST(request: Request) {
  try {
    // Call the server-side logout function

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // check new password is strong
    const error = await updatePassword(newPassword);

    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

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
