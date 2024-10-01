"use server";
import { DeckType } from "@/_types/DeckType";
import { getSupabaseServer } from "@/utils/supabase/server";

/**
 * Get decks created by user id
 *
 * @param userId - uuid of the user
 * @returns {Object}
 * @property {deckType[]} data - deck data
 * @property {string} error - error message
 */

export async function getDecksByUserId(
  userId: string,
): Promise<{ decks: DeckType[] | null; error: any }> {
  try {
    console.log(userId);
    const supabaseServer = getSupabaseServer();
    const { data, error } = await supabaseServer
      .from("decks")
      .select("*, cards(*)")
      .eq("user_uid", userId);

    return { decks: data, error: error };
  } catch (error) {
    console.error(error);
    return { decks: null, error: error };
  }
}
