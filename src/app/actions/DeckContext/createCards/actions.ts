"use server";

import { CardType } from "@/_types/CardType";
import { getSupabaseServer } from "@/utils/supabase/server";

export async function createDeck(cardList: CardType[]) {
  try {
    const supabaseServer = getSupabaseServer();
    const { data, error } = await supabaseServer.from("cards").insert(cardList);

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
