"use server";

import { DeckAttributesTableType } from "@/_types/DeckAttributesTableType";
import { DecksTableType } from "@/_types/DecksTableType";
import { createDeck } from "@/app/actions/DeckContext/createDeck/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      deckData,
      attributes,
    }: { deckData: DecksTableType; attributes: DeckAttributesTableType } =
      await request.json();
    const { deck_uuid, error } = await createDeck(deckData, attributes);

    if (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }

    return NextResponse.json({ deck_uuid }, { status: 201 });
  } catch (error) {
    console.error("Error creating deck: ", error);
    return NextResponse.json(
      { error: "An unexpected error happened" },
      { status: 500 },
    );
  }
}
