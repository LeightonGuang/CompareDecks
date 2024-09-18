"use server";
import { createClient } from "@/utils/supabase/client";

/**
 * Create deck in supabase
 *
 * @param {string} name - name of the deck
 * @param {string} user_uid - uuid of the user
 * @return {string} uuid - uuid of the deck
 */

export async function createDeck(name: string, user_uid: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("decks")
      .insert([{ name, user_uid }]);

    if (error) console.error(error);
  } catch (error) {
    console.error(error);
  }
}
