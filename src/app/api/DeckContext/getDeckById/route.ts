import { getDeckById } from "@/app/actions/DeckContext/getDeckById/actions";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { uuid } = await request.json();
    const { data, error } = await getDeckById(uuid);

    if (error) {
      return NextResponse.json({ data: null }, { status: 400 });
    }

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
