"use server";
import { getAllDecksList } from "@/app/actions/DeckContext/getAllDecksList/actions";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // no caching

export async function GET(): Promise<NextResponse> {
  try {
    const { allDecksList, error } = await getAllDecksList();

    if (error) {
      console.error("error from getting all deck list");
      return NextResponse.json({ error, allDecksList: null }, { status: 500 });
    }
    if (!allDecksList) {
      console.error("NO decks found");
      return NextResponse.json(
        { allDecksList: null, error: "No decks found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ allDecksList }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error: ", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
