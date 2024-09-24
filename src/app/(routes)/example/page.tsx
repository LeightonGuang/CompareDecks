"use client";

import { useEffect, useState } from "react";
import CompareList from "@/components/compareList/CompareList";
import { supabase } from "@/utils/supabase/client";

import { DeckType } from "@/_types/DeckType";

const ExamplePage = () => {
  const getExampleDeck = async () => {
    try {
      const exampleDeckQuery = await supabase
        .from("decks")
        .select(
          `
        id, 
        user_uid, 
        uuid, 
        name, 
        created_at, 
        edited_at,
        cards:cards (
          id, 
          deck_uuid, 
          imgUrl, 
          brand, 
          name, 
          year, 
          price, 
          description, 
          created_at, 
          edited_at
        )
      `,
        )
        .eq("uuid", "9722a717-8ce5-46a0-894d-e1f39cc50d30");

      const { data, error } = await exampleDeckQuery;

      if (data) {
        setDeckData(data);
        console.log(data);
      }

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [deckData, setDeckData] = useState<DeckType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExampleDeck();
  }, []);

  return (
    <main className="h-dynamic-vh" id="create-deck-page">
      <div className="mx-mobile-spacing">
        <h1 className="pt-mobile-spacing">Example Deck</h1>
        {loading ? <p>Loading...</p> : <CompareList />}
      </div>
    </main>
  );
};
export default ExamplePage;
