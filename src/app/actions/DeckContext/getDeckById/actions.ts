"use server";
import { createClient } from "@/utils/supabase/client";

/**
 * Get deck by id
 *
 * @param {string} uuid - uuid of the deck
 * @returns {Object}
 * @property {Object} data - deck data
 * @property {string} error - error message
 */

export async function getDeckById(
  uuid: string,
): Promise<{ data: any; error: any }> {
  const supabase = createClient();
  try {
    const DeckQuery = await supabase
      .from("decks")
      .select(
        `
    id, 
    user_uid, 
    uuid, 
    name, 
    created_at, 
    edited_at,
    cards:cards (
      id, 
      deck_uuid, 
      imgUrl, 
      brand, 
      name, 
      year, 
      price, 
      description, 
      created_at, 
      edited_at
    )
  `,
      )
      .eq("uuid", uuid);

    const { data, error } = await DeckQuery;
    return { data, error };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
}
