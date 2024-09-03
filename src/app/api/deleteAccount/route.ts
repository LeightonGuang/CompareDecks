import { deleteAccount } from "@/app/actions/auth/deleteAccount/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    const response = await deleteAccount(userId);

    if (!response?.success) {
      return NextResponse.json(response?.message, { status: 400 });
    }

    return NextResponse.json(response?.message, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(error, { status: 500 });
  }
}
