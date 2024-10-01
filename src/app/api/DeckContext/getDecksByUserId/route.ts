"use server";

import { getDecksByUserId } from "@/app/actions/DeckContext/getDecksByUserId/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { userId } = await request.json();

    const { decks, error } = await getDecksByUserId(userId);
    if (error) return NextResponse.json({ data: null }, { status: 400 });

    return NextResponse.json({ data: decks }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
