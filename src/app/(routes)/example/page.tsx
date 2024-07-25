"use client";

import { useEffect, useState } from "react";
import { supabaseAdmin } from "@/config/supabase";
import CompareList from "@/components/compareList/CompareList";

import { CardType } from "@/_types/CardType";

const Example = () => {
  const getExampleDeck = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from("cards")
        .select("*")
        .eq("deck_id", "example");

      if (data) {
        setDeckData(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [deckData, setDeckData] = useState<CardType[]>([]);

  useEffect(() => {
    getExampleDeck();
  }, []);

  return (
    <main className="h-dynamic-vh" id="create-deck-page">
      <div className="mx-mobile-spacing mt-mobile-spacing">
        <h1 className="">Example Deck</h1>
        {deckData.length > 0 ? (
          <CompareList name="Cars" deckData={deckData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};
export default Example;
