"use server";
import { getSupabaseServer } from "@/utils/supabase/server";

/**
 * Get list of all decks
 *
 * @returns {Object}
 * @property {DeckType[] | null} allDecksList - list of all decks
 * @property {string} error - error message
 */

export async function getAllDecksList() {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("decks")
      .select(
        `id, user_uid, uuid, name, created_at, edited_at , cards(imgUrl)`,
      );

    if (data) {
      return { allDecksList: data, error: null };
    }

    if (error) {
      console.error("Error fetching decks:", error.message);
      return { allDecksList: null, error: error.message };
    }
    if (!data) {
      console.error("No decks found:", error);
      return { allDecksList: null, error: "No decks found" };
    }

    return { allDecksList: data, error: null };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { allDecksList: null, error: "Unexpected error" };
  }
}
