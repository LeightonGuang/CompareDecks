"use server";
import { getSupabaseServer } from "@/utils/supabase/server";

import { FetchDeckDataType } from "@/_types/FetchDeckDataType";

export async function getDeckById(
  uuid: string,
): Promise<{ data: FetchDeckDataType | null; error: any }> {
  try {
    const supabaseServer = getSupabaseServer();
    const { data, error } = await supabaseServer
      .from("decks")
      .select(
        `*,
        attributes (*),
        cards (
          *,
          attribute_values (
            *,
            attributes (
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
