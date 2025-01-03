"use server";

import { CardTableType } from "@/_types/CardsTableType";
import { getSupabaseServer } from "@/utils/supabase/server";

export async function createDeck(cardList: CardTableType[]) {
  try {
    const supabaseServer = getSupabaseServer();
    const { data, error } = await supabaseServer.from("cards").insert(cardList);

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
