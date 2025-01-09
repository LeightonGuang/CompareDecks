"use server";
import { DecksTableType } from "@/_types/DecksTableType";
import { getSupabaseServer } from "@/utils/supabase/server";

export async function getDeckById(
  uuid: string,
): Promise<{ data: DecksTableType | null; error: any }> {
  try {
    const supabaseServer = getSupabaseServer();
    const { data, error } = await supabaseServer
      .from("decks")
      .select(
        `*,
        deck_attributes (*),
        cards (
          *,
          attribute_values (
            *,
            deck_attributes (
              *
            )
          )
        )`,
      )
      .eq("uuid", uuid)
      .order("id", { ascending: true })
      .single();

    return {
      data,
      error,
    };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
}
