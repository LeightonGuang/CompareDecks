"use client";

import { useState } from "react";
import CompareList from "@/components/compareList/CompareList";

import { DeckType } from "@/_types/DeckType";

const CreateDeckPage = () => {
  const [deckData, setDeckData] = useState<DeckType | null>(null);

  return (
    <main className="h-dynamic-vh overflow-y-auto" id="create-deck-page">
      <div className="mx-mobile-spacing">
        <CompareList deckData={deckData} />
      </div>
    </main>
  );
};

export default CreateDeckPage;
