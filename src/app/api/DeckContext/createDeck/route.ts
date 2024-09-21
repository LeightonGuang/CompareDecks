"use server";

import { CardType } from "@/_types/CardType";
import { createDeck } from "@/app/actions/DeckContext/createDeck/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      supabase,
      name,
      user_uid,
      cardList,
    }: { supabase: any; name: string; user_uid: string; cardList: CardType[] } =
      await request.json();
    const { uuid, error } = await createDeck(supabase, name, user_uid);

    if (error) {
      return NextResponse.json({ data: null }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
  }
}
