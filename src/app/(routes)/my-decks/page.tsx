"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import redBinIcon from "../../../_assets/icons/redBinIcon.svg";
import { getSupabase } from "@/utils/supabase/client";

import { DeckType } from "@/_types/DeckType";

const MyDecksPage = () => {
  const router = useRouter();
  const { fetchUser, user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [decks, setDecks] = useState<DeckType[]>([]);

  const getDeckListByUserId = async () => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("decks")
        .select("*, cards(*)")
        .eq("user_uid", user?.id);

      if (data) setDecks(data);
      if (error) console.error(error);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeckClick = (uuid: string) => {
    router.push(`/decks/${uuid}`);
  };

  const handleDeleteButton = async (uuid: string) => {
    console.log("delete deck", uuid);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await fetchUser();
        await getDeckListByUserId();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!isLoading && (
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
                    {decks.map((deck, i) => (
                      <tr
                        className="cursor-pointer border-t-[1px] border-[#E2E8F0] hover:bg-[#f9fafc]"
                        key={i}
                        onClick={() => handleDeckClick(deck.uuid)}
                      >
                        <td className="p-[1rem]">
                          <img
                            className="h-[4rem] w-[4rem] object-contain"
                            src={deck.cards[0]?.imgUrl}
                            alt=""
                          />
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default MyDecksPage;
