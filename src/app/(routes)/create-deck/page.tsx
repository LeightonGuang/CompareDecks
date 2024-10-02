"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useDeck } from "@/context/DeckContext";
import CompareList from "@/components/compareList/CompareList";

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
    createDeck,
  } = useDeck();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleCreateDeckButton = async () => {
    try {
      if (user.aud !== "authenticated") {
        return console.error("User is not authenticated");
      }

      const filteredCardsData = pendingDeckData.cards.map((card) => {
        const { id, created_at, edited_at, ...rest } = card;
        return rest;
      });

      const deckDataWithoutCardsId = {
        ...pendingDeckData,
        cards: filteredCardsData,
      };

      const response = await createDeck(deckDataWithoutCardsId);

      if (response.success) {
        router.push(`/decks/${response.deck_uuid}`);
      } else if (!response.success) {
        router.push("/error");
      }
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
    if (user !== null) {
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
              disabled={pendingDeckData?.cards?.length === 0}
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
