"use server";
import { DeckAttributesTableType } from "@/_types/DeckAttributesTableType";
import { DecksTableType } from "@/_types/DecksTableType";
import { getSupabaseServer } from "@/utils/supabase/server";

/**
 * @param {DeckType} deckData
 *
 * @returns {Object}
 * @property {boolean} hasEmptyDeckName - Whether the deck name is empty
 * @property {boolean} hasEmptyCards - Whether the deck has no cards
 */

const validateDeck = (deckData: DecksTableType) => {
  const deckErrors = {
    hasEmptyDeckName: deckData.name === "",
    hasEmptyCards: deckData.cards.length === 0,
  };

  const hasDeckErrors: boolean = Object.values(deckErrors).some(
    (error) => error,
  );

  return { hasDeckErrors, deckErrors };
};

/**
 * Create deck in supabase
 *
 * @param {DeckType} deckData - name of the deck
 * @param {DeckAttributesTableType} attributes - attributes of the deck
 *
 * @return {Object} - An object containing the uuid of the deck and any errors that occurred.
 * @property {string} uuid - The uuid of the deck
 * @property {any} error - Any errors that occurred
 */

export async function createDeck(
  deckData: DecksTableType,
  attributes: DeckAttributesTableType,
): Promise<{ deck_uuid: string | null; error: any }> {
  try {
    const { hasDeckErrors, deckErrors } = validateDeck(deckData);

    if (hasDeckErrors) {
      return { deck_uuid: null, error: deckErrors };
    }

    const supabaseServer = getSupabaseServer();
    const { data: userData, error: userError } =
      await supabaseServer.auth.getUser();

    if (userError) {
      console.error("User Authentication Error: ", userError.message);
      return { deck_uuid: null, error: userError };
    }

    const { data: createDeckData, error: createDeckError } =
      await supabaseServer
        .from("decks")
        .insert({ name: deckData.name, user_uid: deckData.user_uid })
        .select("uuid");

    console.log(createDeckData);

    if (createDeckError) {
      console.error("Supabase CreateDeck Error: " + createDeckError.message);
      return { deck_uuid: null, error: createDeckError.message };
    }

    const deckId = createDeckData?.[0]?.uuid || null;

    if (!deckId) {
      return { deck_uuid: null, error: "Failed to retrieve created deck id" };
    }

    const cardsWithDeckId = deckData.cards.map((card) => ({
      ...card,
      deck_uuid: deckId,
    }));

    const { data: createCardsData, error: createCardsError } =
      await supabaseServer.from("cards").insert(cardsWithDeckId).select("*");

    if (createCardsError) {
      console.error("Supabase CreateCards Error: " + createCardsError.message);
      return { deck_uuid: null, error: createCardsError.message };
    }

    return { deck_uuid: deckId, error: null };
  } catch (error) {
    console.error(error);
    return { deck_uuid: null, error: error };
  }
}
