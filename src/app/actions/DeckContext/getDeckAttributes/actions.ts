"use server";
import { getSupabaseServer } from "@/utils/supabase/server";

export async function getDeckAttributes(deck_uuid: string) {
  try {
    const supabaseServer = getSupabaseServer();
    const { data, error } = await supabaseServer
      .from("deck_attributes")
      .select("*")
      .eq("deck_uuid", deck_uuid)
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching deck attributes:", error.message);
      return { deckAttributes: null, error: error.message };
    }

    if (!data) {
      console.error("No deck attributes found:", error);
      return { deckAttributes: null, error: "No deck attributes found" };
    }

    return { deckAttributes: data, error: null };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { deckAttributes: null, error: "Unexpected error" };
  }
}
