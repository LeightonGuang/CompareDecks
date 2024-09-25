"use server";
import { supabaseServer } from "@/utils/supabase/server";

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
  try {
    const { data, error } = await supabaseServer
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

    return { data, error };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
}
