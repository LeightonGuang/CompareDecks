"use client";

import { DecksTableType } from "@/_types/DecksTableType";
import CompareList from "@/components/compareList/CompareList";
import SetupCreateDeckModal from "@/components/createDeck/SetupCreateDeckModal";
import React, { useEffect, useState } from "react";

const CreateDeckPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [deckData, setDeckData] = useState<DecksTableType>({
    name: "",
    user_uid: "",
    uuid: "",
    deck_attributes: [],
    cards: [],
  });
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(true);

  useEffect(() => {
    console.log("deckData", deckData);
  }, [deckData]);

  return (
    <section>
      <CompareList
        className="mx-4 mt-4"
        deckData={deckData}
        setDeckData={setDeckData}
      />

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
