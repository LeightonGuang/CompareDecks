"use server";

import { getSupabaseServer } from "@/utils/supabase/server";

/**
 * Delete deck
 *
 * @param {string} deck_id - uuid of the deck
 * @returns {Object}
 * @property {Object} data -
 * @property {string} error - error message
 */

export async function deleteDeck(deckId: string) {
  try {
    const supabaseServer = getSupabaseServer();

    const { status, statusText } = await supabaseServer
      .from("decks")
      .delete()
      .eq("uuid", deckId);

    console.table({ deckId: deckId, status, statusText });

    return { status, statusText };
  } catch (error) {
    console.error(error);
    return { data: null, error: error };
  }
}
