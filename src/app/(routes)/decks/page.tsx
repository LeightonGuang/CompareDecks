"use client";
export const dynamic = "force-dynamic"; // no caching

import Image from "next/image";
import { useEffect, useState } from "react";
import { THead, TData } from "@/components/list/ListComponents";
import placeholder from "../../../_assets/images/placeholder.svg";

import { DeckListType } from "@/_types/DeckListType";
import { TextLoadingAnimation } from "@/components/animation/TextLoadingAnimation";
import { getAllDecksList } from "@/app/actions/DeckContext/getAllDecksList/actions";

const DecksPage = () => {
  const [decksList, setDecksList] = useState<DeckListType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDecks = async () => {
    try {
      const response = await getAllDecksList();

      if (response.data) {
        console.log(response.data);
        setDecksList(response.data);
      } else if (response.error) {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDecks();
  }, []);

  return (
    <main className="h-dynamic-vh overflow-y-auto" id="decks-page">
      <div
        className="flex h-full items-center justify-center"
        id="decks-page__container"
      >
        <div
          className="m-[1rem] rounded-[0.5rem] border shadow-xs"
          id="decks-card"
        >
          <div className="px-[1.5rem] py-[1rem]">
            <h1 className="text-[1.5rem] leading-[1.5rem] font-[600]">
              Browse decks
            </h1>
            <p className="mt-[0.375rem] text-[0.875rem] leading-[1.25rem] text-[#5E6D82]">
              Browse all the decks people have created.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="hover:bg-[#f9fafc]">
                  <THead>Preview</THead>
                  <THead>Deck name</THead>
                  <THead className="hidden sm:table-cell">User id</THead>
                  <THead>Date created</THead>
                </tr>
              </thead>

              <tbody>
                {isLoading
                  ? Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <tr
                          className="border-t-[1px] border-[#E2E8F0] p-[1rem]"
                          key={i}
                        >
                          <td className="flex justify-center p-[1rem]">
                            <div className="h-[4rem] w-[4rem]">
                              <TextLoadingAnimation />
                            </div>
                          </td>
                          <td className="p-[1rem]">
                            <div className="h-[1rem]">
                              <TextLoadingAnimation />
                            </div>
                          </td>
                          <td className="p-[1rem]">
                            <div className="h-[1rem]">
                              <TextLoadingAnimation />
                            </div>
                          </td>
                          <td className="p-[1rem]">
                            <div className="h-[1rem]">
                              <TextLoadingAnimation />
                            </div>
                          </td>
                        </tr>
                      ))
                  : decksList.map((deck) => (
                      <tr
                        className="border-t-[1px] border-[#E2E8F0] hover:bg-[#f9fafc]"
                        key={deck.uuid}
                      >
                        <TData href={`/decks/${deck.uuid}`}>
                          <div>
                            {deck?.cards?.[0]?.imgUrl ? (
                              <img
                                alt="preview"
                                className="h-[4rem] w-[4rem] object-contain"
                                src={deck.cards[0]?.imgUrl}
                              />
                            ) : (
                              <Image
                                className="h-[4rem] w-[4rem]"
                                src={placeholder}
                                alt="placeholder"
                              />
                            )}
                          </div>
                        </TData>
                        <TData href={`/decks/${deck.uuid}`}>{deck.name}</TData>

                        <TData
                          className="hidden sm:table-cell"
                          href={`/decks/${deck.uuid}`}
                        >
                          {deck.user_uid}
                        </TData>

                        <TData href={`/decks/${deck.uuid}`}>
                          {new Date(deck.created_at || "").toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            },
                          )}
                        </TData>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DecksPage;
