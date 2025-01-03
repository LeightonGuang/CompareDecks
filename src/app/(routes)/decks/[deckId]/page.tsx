"use client";

import { useEffect, useState } from "react";
import CompareList from "@/components/compareList/CompareList";
import { useDeck } from "@/context/DeckContext";
import { useUser } from "@/context/UserContext";
import { TextLoadingAnimation } from "@/components/animation/TextLoadingAnimation";

import { DecksTableType } from "@/_types/DecksTableType";

const DeckPage = ({ params }: { params: { deckId: string } }) => {
  const { user, fetchUser } = useUser();
  const {
    getDeckById,
    pendingDeckData,
    setPendingDeckData,
    originalDeckData,
    setOriginalDeckData,
  } = useDeck();

  const [isLoading, setIsLoading] = useState(true);

  const getDeck = async () => {
    setPendingDeckData({} as DecksTableType);
    try {
      const response = await getDeckById(params.deckId);

      if (response) {
        const { success, error, data } = response;

        if (data !== null) {
          setOriginalDeckData(data[0]);
          setPendingDeckData(data[0]);
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
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await fetchUser();
        await getDeck();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="h-dynamic-vh overflow-y-auto" id="create-deck-page">
      <div className="mx-mobile-spacing">
        {isLoading ? (
          <div className="mt-[1rem] w-full" id="deck-page-loading-card">
            <h1 className="h-[2rem] w-[16rem]">
              <TextLoadingAnimation />
            </h1>
            <div className="mt-[1rem] flex h-[34rem] rounded-[0.25rem] bg-[#e0e0e0] p-[1.5rem]">
              <ul className="w-[6.5rem]">
                <li className="h-[2.5rem]" />
                <li className="h-[8rem] border-b border-b-[#c5c5c5] p-[1rem]" />
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <li
                      className="border-b border-b-[#c5c5c5] p-[1rem]"
                      key={index}
                    >
                      <div className="h-[1.3125rem] w-full">
                        <TextLoadingAnimation />
                      </div>
                    </li>
                  ))}
              </ul>
              <ul className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <li className="w-[10rem]" key={index}>
                      <ul className="text-center">
                        <li className="h-[2.5rem]" />
                        <li className="h-[8rem] border-b border-b-[#c5c5c5] p-[0.5rem]">
                          <TextLoadingAnimation />
                        </li>
                        {Array(5)
                          .fill(0)
                          .map((_, j) => (
                            <li
                              className="border-b border-b-[#c5c5c5] p-[1rem]"
                              key={j}
                            >
                              <div className="h-[1.3125rem] w-full">
                                <TextLoadingAnimation />
                              </div>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : (
          <>
            <CompareList />
            <div className="absolute right-0">
              <button
                className="ml-[auto] mr-[1rem] mt-[1rem] rounded-[0.325rem] bg-green-500 px-[1rem] py-[0.5rem] text-white disabled:bg-gray-400 disabled:text-black"
                disabled={
                  JSON.stringify(pendingDeckData) ===
                  JSON.stringify(originalDeckData)
                }
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
