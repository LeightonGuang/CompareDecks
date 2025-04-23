"use server";
import { DeckListType } from "@/_types/DeckListType";
import { getSupabaseServer } from "@/utils/supabase/server";

// Get list of all decks

export async function getAllDecksList(): Promise<{
  data: DeckListType[] | null;
  error: any | null;
}> {
  {
    try {
      const supabase = getSupabaseServer();
      const { data, error } = await supabase
        .from("decks")
        .select(
          `id, user_uid, uuid, name, created_at, edited_at , cards(imgUrl)`,
        )
        .order("id", { ascending: true });

      if (data) {
        return { data: data, error: null };
      }

      if (error) {
        console.error("Error fetching decks:", error);
        return { data: null, error: error };
      }
      if (!data) {
        console.error("No decks found:", error);
        return { data: null, error: "No decks found" };
      }

      return { data: data, error: null };
    } catch (error) {
      console.error("Unexpected error:", error);
      return { data: null, error: "Unexpected error" };
    }
  }
}
