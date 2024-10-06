"use server";

import { deleteDeck } from "@/app/actions/DeckContext/deleteDeck/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { deckId } = await request.json();
    const { data, error } = await deleteDeck(deckId);

    if (error) {
      return NextResponse.json({ data: null }, { status: 400 });
    }
    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
