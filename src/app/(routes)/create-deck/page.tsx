"use client";

import { DecksTableType } from "@/_types/DecksTableType";
import CompareList from "@/components/compareList/CompareList";
import SetupCreateDeckModal from "@/components/createDeck/SetupCreateDeckModal";
import React, { useEffect, useState } from "react";

const CreateDeckPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [deckData, setDeckData] = useState<DecksTableType>({
    name: "",
    user_uid: "",
    uuid: "",
    deck_attributes: [],
    cards: [],
  });
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(true);

  const handleAddDeckButton = () => {
    if (isAuthenticated) {
      // add deck to supabase
    } else if (!isAuthenticated) {
      localStorage.setItem("Deck", JSON.stringify(deckData));
    }
  };

  useEffect(() => {
    console.log("deckData", deckData);
  }, [deckData]);

  return (
    <section>
      <div>
        <CompareList
          className="mx-4 mt-4"
          deckData={deckData}
          setDeckData={setDeckData}
        />

        <button
          className="mx-4 mt-4 w-min whitespace-nowrap rounded-md bg-[#1d4ed8] px-6 py-2 text-right text-white"
          onClick={handleAddDeckButton}
        >
          Create Deck
        </button>
      </div>

      {showCreateDeckModal && (
        <SetupCreateDeckModal
          setShowCreateDeckModal={setShowCreateDeckModal}
          deckData={deckData}
          setDeckData={setDeckData}
        />
      )}
    </section>
  );
};

export default CreateDeckPage;
