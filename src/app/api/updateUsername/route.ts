import { NextResponse } from "next/server";
import { updateUsername } from "@/app/actions/auth/updateUsername/actions";

export async function POST(request: Request) {
  try {
    const { userId, newUsername } = await request.json();

    const result = await updateUsername(userId, newUsername);

    console.log(result);

    if (!result?.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(
      { message: "Username updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: `Error updating username: ${error}`,
      },
      { status: 500 },
    );
  }
}
