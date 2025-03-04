"use client";

import { useEffect, useState } from "react";
import CompareList from "@/components/compareList/CompareList";
import { getDeckById } from "@/app/actions/DeckContext/getDeckById/actions";
import { TextLoadingAnimation } from "@/components/animation/TextLoadingAnimation";

import { DecksTableType } from "@/_types/DecksTableType";

const DeckPage = ({ params }: { params: { deckId: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deckData, setDeckData] = useState<DecksTableType>(
    {} as DecksTableType,
  );

  const LoadingSkeleton = () => (
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
              <li className="border-b border-b-[#c5c5c5] p-[1rem]" key={index}>
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
  );

  const fetchData = async () => {
    try {
      const { data: deckData, error: deckError } = await getDeckById(
        params.deckId,
      );

      if (deckError) {
        console.error(deckError);
      } else if (deckData) {
        setDeckData(deckData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="h-dynamic-vh overflow-y-auto" id="create-deck-page">
      <div className="mx-mobile-spacing">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <CompareList
            className="mx-4 mt-4"
            deckData={deckData}
            setDeckData={setDeckData}
          />
        )}
      </div>
    </section>
  );
};

export default DeckPage;
