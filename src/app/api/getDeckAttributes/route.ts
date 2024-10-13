"use server";

import { getDeckAttributes } from "@/app/actions/DeckContext/getDeckAttributes/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { deck_uuid } = body;

    const { deckAttributes, error } = await getDeckAttributes(deck_uuid);

    if (error) {
      console.error("Error fetching deck attributes:", error);
      return NextResponse.json(
        { deckAttributes: null, error },
        { status: 500 },
      );
    }

    if (!deckAttributes) {
      console.error("No deck attributes found:", error);
      return NextResponse.json(
        { deckAttributes: null, error: "No deck attributes found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ deckAttributes, error: null }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error happened" },
      { status: 500 },
    );
  }
}
