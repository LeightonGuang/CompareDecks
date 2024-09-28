"use server";
import { getAllDecksList } from "@/app/actions/DeckContext/getAllDecksList/actions";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const headers = new Headers();
  headers.set("Cache-Control", "no-store");

  try {
    const { allDecksList, error } = await getAllDecksList();

    if (error) {
      console.error("error from getting all deck list");
      return NextResponse.json(
        { error, allDecksList: null },
        { status: 500, headers },
      );
    }

    if (!allDecksList) {
      console.error("NO decks found");
      return NextResponse.json(
        { allDecksList: null, error: "No decks found" },
        { status: 404, headers },
      );
    }

    return NextResponse.json({ allDecksList }, { status: 200, headers });
  } catch (error) {
    console.error("Unexpected error: ", error);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500, headers },
    );
  }
}
