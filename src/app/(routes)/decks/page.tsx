"use client";
export const dynamic = "force-dynamic"; // no caching

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import placeholder from "../../../_assets/images/placeholder.svg";

import { DeckType } from "@/_types/DeckType";
import { useUser } from "@/context/UserContext";
import { useDeck } from "@/context/DeckContext";
import { TextLoadingAnimation } from "@/components/animation/TextLoadingAnimation";

const DecksPage = () => {
  const { user, fetchUser } = useUser();
  const { getAllDecks } = useDeck();
  const [decksList, setDecksList] = useState<DeckType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDecks = async () => {
    try {
      const response = await getAllDecks();
      // console.table(response);
      if (response?.success) {
        if (response.decks) {
          setDecksList(response.decks);
        } else {
          console.error("No decks found");
        }
      } else if (!response?.success) {
        console.error(response?.error);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, []);

  useEffect(() => {
    if (user !== null) {
      getDecks();
    }
  }, [user]);

  const THead = ({ children }: { children: React.ReactNode }) => {
    return (
      <th className="h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82]">
        {children}
      </th>
    );
  };

  const TData = ({
    children,
    className = "",
    href = "/",
  }: {
    children?: React.ReactNode;
    className?: string;
    href?: string;
  }) => {
    return (
      <td>
        <Link className={`${className} w-min`} href={href}>
          {children}
        </Link>
      </td>
    );
  };

  return (
    <main className="h-dynamic-vh overflow-y-auto" id="decks-page">
      <div
        className="mx-mobile-spacing mt-[1.5rem] flex justify-center"
        id="decks-page__container"
      >
        <div
          className="w-max min-w-[40rem] rounded-[0.5rem] border shadow-sm"
          id="decks-card"
        >
          <div className="px-[1.5rem] py-[1rem]">
            <h1 className="text-[1.5rem] font-[600] leading-[1.5rem]">
              Browse decks
            </h1>
            <p className="mt-[0.375rem] text-[0.875rem] leading-[1.25rem] text-[#5E6D82]">
              Browse all the decks people have created.
            </p>
          </div>
          <div>
            <div className="p-[1.5rem]">
              <table className="mt-mobile-spacing w-full table-auto">
                <thead>
                  <tr className="hover:bg-[#f9fafc]">
                    <THead>Preview</THead>
                    <THead>Deck name</THead>
                    <THead>User id</THead>
                    <THead>Date created</THead>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr className="border-t-[1px] border-[#E2E8F0] p-[1rem]">
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
                  ) : (
                    decksList.map((deck: DeckType) => (
                      <tr
                        className="border-t-[1px] border-[#E2E8F0] hover:bg-[#f9fafc]"
                        key={deck.uuid}
                      >
                        <TData href={`/decks/${deck.uuid}`}>
                          <div className="p-[1rem]">
                            {deck.cards[0]?.imgUrl ? (
                              <img
                                className="h-[4rem] w-[4rem] object-contain"
                                src={deck.cards[0]?.imgUrl}
                                alt="preview"
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
                        <TData
                          className="h-min whitespace-nowrap p-[1rem]"
                          href={`/decks/${deck.uuid}`}
                        >
                          {deck.name}
                        </TData>

                        <TData
                          className="h-max-[2.75rem] whitespace-nowrap px-[1rem] py-[0.75rem]"
                          href={`/decks/${deck.uuid}`}
                        >
                          {deck.user_uid}
                        </TData>
                        <td className="h-max-[2.75rem] whitespace-nowrap px-[1rem] py-[0.75rem]">
                          {new Date(deck.created_at).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            },
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DecksPage;
