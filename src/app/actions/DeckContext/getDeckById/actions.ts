"use server";
import { getSupabaseServer } from "@/utils/supabase/server";

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
    const supabaseServer = getSupabaseServer();
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
    cards (
      id, 
      deck_uuid, 
      imgUrl, 
      brand, 
      name, 
      year, 
      price, 
      description, 
      created_at, 
      edited_at,
      attribute_values (
        id, 
        attribute_id,
        card_id,
        value,
        created_at,
        edited_at,
        deck_attributes (
          id,
          deck_uuid,
          attribute,
          created_at,
          edited_at
        )
      )
    )
  `,
      )
      .eq("uuid", uuid)
      .order("id", { ascending: true });

    return { data, error };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
}
