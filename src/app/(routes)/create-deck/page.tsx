"use client";

import { useState } from "react";
import CompareList from "@/components/compareList/CompareList";

import { DeckType } from "@/_types/DeckType";

const CreateDeck = () => {
  const [deckData, setDeckData] = useState<DeckType | null>(null);

  return (
    <main>
      <div>Create Deck</div>
      <CompareList deckData={deckData} />
    </main>
  );
};

export default CreateDeck;
