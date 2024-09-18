import { CardType } from "@/_types/CardType";
import { createClient } from "@/utils/supabase/client";

export async function createDeck(cardList: CardType[]) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("cards").insert(cardList);
  } catch (error) {
    console.error(error);
  }
}
