"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useDeck } from "@/context/DeckContext";
import { createClient } from "@/utils/supabase/client";
import CompareList from "@/components/compareList/CompareList";

import { CardType } from "@/_types/CardType";
import { DeckType } from "@/_types/DeckType";

const CreateDeckPage = () => {
  const router = useRouter();
  const { user, fetchUser } = useUser();
  const {
    setOriginalDeckData,
    pendingDeckData,
    setPendingDeckData,
    pinnedList,
    setPinnedList,
    unpinnedList,
    setUnpinnedList,
  } = useDeck();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (user === undefined && !isLoading) {
    router.push("/");
  }

  const handleCreateDeckButton = async () => {
    if (user.aud !== "authenticated") {
      return console.error("User is not authenticated");
    }
    console.log("Create deck button clicked");
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("decks")
        .insert([{ name: "New Deck", user_uid: user?.id }]);

      if (error) console.error(error);

      const { data: insertedDeck, error: selectError } = await supabase
        .from("decks")
        .select("*")
        .eq("user_uid", user?.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (insertedDeck) {
        const insertedDeckUuid = insertedDeck[0].uuid;

        const cardList: CardType[] = pendingDeckData?.cards.map((card) => ({
          deck_uuid: insertedDeckUuid,
          imgUrl: card.imgUrl,
          brand: card.brand,
          name: card.name,
          year: card.year,
          price: card.price,
          description: card.description,
        })) as CardType[];

        const { data: uploadedCards, error: uploadError } = await supabase
          .from("cards")
          .insert(cardList);

        if (uploadedCards) {
          console.log("Uploaded cards:", uploadedCards);
          router.push(`/decks/${insertedDeckUuid}`);
        }

        if (uploadError) console.error(uploadError);
      }

      if (selectError) console.error(selectError);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (pinnedList.length !== 0) setPinnedList([]);
    if (unpinnedList.length !== 0) setUnpinnedList([]);
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setOriginalDeckData({
        name: "",
        cards: [],
        user_uid: user?.id,
      } as unknown as DeckType);
      setPendingDeckData({
        name: "",
        cards: [],
        user_uid: user?.id,
      } as unknown as DeckType);
      setIsLoading(false);
    }
  }, [user]);

  return (
    <main className="h-dynamic-vh overflow-y-auto" id="create-deck-page">
      <div className="mx-mobile-spacing">
        {!isLoading && (
          <>
            <CompareList />
            <button
              className="rounded-full bg-green-500 px-[0.5rem] py-[0.25rem] text-[0.75rem] text-[#f2f5fc] disabled:bg-gray-400 disabled:text-black"
              onClick={handleCreateDeckButton}
              disabled={pendingDeckData.cards.length === 0}
            >
              Create
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default CreateDeckPage;
