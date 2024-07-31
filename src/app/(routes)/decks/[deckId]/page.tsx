"use client";

import { DeckType } from "@/_types/DeckType";
import CompareList from "@/components/compareList/CompareList";
import { supabaseAdmin } from "@/config/supabase";
import { useEffect, useState } from "react";

const DeckPage = ({ params }: { params: { deckId: string } }) => {
  const [deckData, setDeckData] = useState<DeckType[]>([]);
  const [loading, setLoading] = useState(true);

  const getDeck = async () => {
    try {
      const exampleDeckQuery = await supabaseAdmin
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
      `
        )
        .eq("uuid", params.deckId);

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

  useEffect(() => {
    getDeck();
  }, []);

  return (
    <main className="h-dynamic-vh overflow-y-auto" id="create-deck-page">
      <div className="mx-mobile-spacing">
        {loading ? <p>Loading...</p> : <CompareList deckData={deckData[0]} />}
      </div>
    </main>
  );
};

export default DeckPage;
