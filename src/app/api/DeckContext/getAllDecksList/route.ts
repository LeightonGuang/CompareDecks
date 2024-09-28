"use server";
import { getAllDecksList } from "@/app/actions/DeckContext/getAllDecksList/actions";
import { NextResponse } from "next/server";

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
    const response = NextResponse.json({ allDecksList }, { status: 200 });
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Unexpected error: ", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
