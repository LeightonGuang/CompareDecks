import { NextResponse } from "next/server";
import { updatePassword } from "@/app/actions/auth/updatePassword/actions";
import { login } from "@/app/actions/auth/login/actions";

/**
 * This function updates the password of the user
 *
 * @param request request object {email, currentPassword, newPassword}
 * @returns {Object}
 * @property {string} error - an error message
 * @property {number} status - the status code of the update
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, currentPassword, newPassword } = body;

    const loginErrorMessage = await login(email, currentPassword);

    if (loginErrorMessage) {
      return NextResponse.json({ error: loginErrorMessage }, { status: 400 });
    }

    // check new password is strong
    const { success, passwordValidationErrors, supabaseError } =
      await updatePassword(newPassword);

    if (!success && supabaseError === null) {
      // validation error
      return NextResponse.json(
        { error: passwordValidationErrors },
        { status: 400 },
      );
    } else if (!success && supabaseError) {
      // supabase error
      return NextResponse.json({ error: supabaseError }, { status: 400 });
    } else if (success) {
      return NextResponse.json({ error: null }, { status: 200 });
    }
  } catch (error) {
    console.error("Password change API error: " + error);
    // Respond with an error if something goes wrong
    return NextResponse.json(
      { error: `Password change error: ${error}` },
      { status: 500 },
    );
  }
}
