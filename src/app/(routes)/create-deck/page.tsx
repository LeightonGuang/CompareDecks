"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useDeck } from "@/context/DeckContext";
import CompareList from "@/components/compareList/CompareList";

import { DecksTableType } from "@/_types/DecksTableType";
import SetupCreateDeckModal from "@/components/createDeck/SetupCreateDeckModal";
import { DeckAttributesTableType } from "@/_types/DeckAttributesTableType";

const CreateDeckPage = () => {
  const router = useRouter();
  const { user, fetchUser } = useUser();
  const {
    setAttributeNames,
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
  const [newAttributes, setNewAttributes] = useState<DeckAttributesTableType[]>(
    [],
  );
  const [showSetupCreateDeckModal, setShowSetupCreateDeckModal] =
    useState<boolean>(true);

  const handleCreateDeckButton = async () => {
    try {
      if (user.aud !== "authenticated") {
        return console.error("User is not authenticated");
      }

      const filteredCardsData = pendingDeckData.cards.map((card) => {
        const { id, created_at, edited_at, ...rest } = card;
        return rest;
      });

      const response = await createDeck(pendingDeckData, newAttributes);

      if (response.success) {
        router.push(`/decks/${response.deck_uuid}`);
      } else if (!response.success) {
        router.push("/error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeckSetup = () => {};

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
      } as unknown as DecksTableType);
      setPendingDeckData({
        name: "",
        cards: [],
        user_uid: user?.id,
      } as unknown as DecksTableType);
      setIsLoading(false);
    }
  }, [user]);

  return (
    <main className="h-dynamic-vh overflow-y-auto" id="create-deck-page">
      <div className="mx-mobile-spacing">
        {!isLoading && (
          <>
            <CompareList />
            <div className="absolute right-0">
              <button
                className="ml-[auto] mr-[1rem] mt-[1rem] rounded-[0.325rem] bg-green-500 px-[1rem] py-[0.5rem] text-white disabled:bg-gray-400 disabled:text-black"
                onClick={handleCreateDeckButton}
                disabled={
                  pendingDeckData?.cards?.length === 0 ||
                  pendingDeckData?.name === ""
                }
              >
                Create
              </button>
            </div>
          </>
        )}
      </div>

      {showSetupCreateDeckModal && (
        <SetupCreateDeckModal
          setShowSetupCreateDeckModal={setShowSetupCreateDeckModal}
        />
      )}
    </main>
  );
};

export default CreateDeckPage;
