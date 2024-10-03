"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useDeck } from "@/context/DeckContext";
import redBinIcon from "../../../_assets/icons/redBinIcon.svg";
import placeholder from "../../../_assets/images/placeholder.svg";

import { DeckType } from "@/_types/DeckType";
import { TextLoadingAnimation } from "@/components/animation/TextLoadingAnimation";

const MyDecksPage = () => {
  const router = useRouter();
  const { user, fetchUser } = useUser();
  const { getDecksByUserId } = useDeck();
  const [isLoading, setIsLoading] = useState(true);
  const [decks, setDecks] = useState<DeckType[]>([]);

  const handleDeckClick = (uuid: string) => {
    router.push(`/decks/${uuid}`);
  };

  const handleDeleteButton = async (uuid: string) => {
    console.log("delete deck", uuid);
  };

  const getUsersDecks = async () => {
    try {
      const response = await getDecksByUserId(user.id);
      if (response?.success) {
        if (response.decks) {
          setDecks(response.decks);
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
      getUsersDecks();
    }
  }, [user]);

  return (
    <>
      <main className="h-dynamic-vh overflow-y-auto" id="my-deck-page">
        <div
          className="mx-mobile-spacing mt-[1.5rem] flex justify-center"
          id="my-deck-page__container"
        >
          <div
            className="md: w-max rounded-[0.5rem] border shadow-sm"
            id="my-deck-page__card"
          >
            <div className="px-[1.5rem] py-[1rem]">
              <h1 className="text-[1.5rem] font-[600] leading-[1.5rem]">
                My Decks
              </h1>
              <p className="mt-[0.375rem] text-[0.875rem] leading-[1.25rem] text-[#5E6D82]">
                Mange your created Decks.
              </p>
            </div>
            <div className="p-[1.5rem]">
              <table>
                <thead>
                  <tr className="hover:bg-[#f9fafc]">
                    <th className="h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82]">
                      Preview
                    </th>
                    <th className="h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82]">
                      Name
                    </th>
                    <th className="hidden h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82] md:table-cell">
                      Cards
                    </th>
                    <th className="hidden h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82] md:table-cell">
                      Last Updated
                    </th>
                    <th className="hidden h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82] md:table-cell">
                      Date Created
                    </th>
                    <th className="h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82]">
                      Delete
                    </th>
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
                    decks.map((deck, i) => (
                      <tr
                        className="cursor-pointer border-t-[1px] border-[#E2E8F0] hover:bg-[#f9fafc]"
                        key={i}
                        onClick={() => handleDeckClick(deck.uuid)}
                      >
                        <td className="p-[1rem]">
                          {deck.cards[0]?.imgUrl ? (
                            <img
                              className="h-[4rem] w-[4rem] object-contain"
                              src={deck.cards[0]?.imgUrl}
                              alt=""
                            />
                          ) : (
                            <Image
                              className="h-[4rem] w-[4rem]"
                              src={placeholder}
                              alt="placeholder"
                            />
                          )}
                        </td>
                        <td className="whitespace-nowrap p-[1rem]">
                          {deck.name}
                        </td>
                        <td className="hidden p-[1rem] md:table-cell">
                          {deck.cards.length}
                        </td>
                        <td className="hidden p-[1rem] md:table-cell">
                          {new Date(deck.edited_at).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            },
                          )}
                        </td>
                        <td className="hidden p-[1rem] md:table-cell">
                          {new Date(deck.created_at).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            },
                          )}
                        </td>
                        <td className="p-[1rem]">
                          <button
                            className="mx-auto block"
                            onClick={() => handleDeleteButton(deck.uuid)}
                          >
                            <Image
                              className="h-[1.25rem] w-[1.25rem]"
                              src={redBinIcon}
                              alt="bin icon"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyDecksPage;
