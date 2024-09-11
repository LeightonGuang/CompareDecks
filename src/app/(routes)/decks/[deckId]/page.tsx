"use client";

import CompareList from "@/components/compareList/CompareList";
import { useDeck } from "@/context/DeckContext";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

const DeckPage = ({ params }: { params: { deckId: string } }) => {
  const { user, fetchUser } = useUser();
  const { setDeckData, getDeckById } = useDeck();
  const [isLoading, setIsLoading] = useState(true);

  const getDeck = async () => {
    setDeckData(null);
    try {
      const response = await getDeckById(params.deckId);
      if (response) {
        const { success, error, data } = response;
        if (data !== null) {
          setDeckData(data[0]);
        }

        if (!success) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      getDeck();
    }
    setIsLoading(false);
  }, [user]);

  return (
    <main className="h-dynamic-vh overflow-y-auto" id="create-deck-page">
      <div className="mx-mobile-spacing">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <CompareList />
            <div className="absolute right-0">
              <button
                className="ml-[auto] mr-[1rem] mt-[1rem] rounded-[0.325rem] bg-green-500 px-[1rem] py-[0.5rem] text-white disabled:bg-gray-400 disabled:text-black"
                disabled={true}
              >
                Update
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default DeckPage;
