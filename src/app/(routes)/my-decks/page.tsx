"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

import redBinIcon from "../../../_assets/icons/redBinIcon.svg";
import { DeckType } from "@/_types/DeckType";

const MyDecksPage = () => {
  const { fetchUser, user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [decks, setDecks] = useState<DeckType[]>([]);

  const getDeckListByUserId = async () => {
    try {
      console.log("userId", user);

      const supabase = createClient();
      const { data, error } = await supabase
        .from("decks")
        .select("*")
        .eq("user_uid", user?.id);

      if (data) {
        setDecks(data);
      }

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      getDeckListByUserId();
    }
  }, [user]);

  return (
    <>
      {!isLoading && (
        <main className="h-dynamic-vh overflow-y-auto" id="my-deck-page">
          <div
            className="mx-mobile-spacing mt-[1.5rem]"
            id="my-deck-page__container"
          >
            <div
              className="mx-auto w-min rounded-[0.5rem] border shadow-sm"
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
                        Image
                      </th>
                      <th className="h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82]">
                        Name
                      </th>
                      <th className="h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82]">
                        Cards
                      </th>
                      <th className="h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82]">
                        Last Updated
                      </th>
                      <th className="h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82]">
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
                        className="border-t-[1px] border-[#E2E8F0] hover:bg-[#f9fafc]"
                        key={i}
                      >
                        <td className="p-[1rem]">
                          <img
                            className="min-h-[4rem] min-w-[4rem] object-contain"
                            src="https://placehold.co/600x400"
                            alt=""
                          />
                        </td>
                        <td className="p-[1rem]">{deck.name}</td>
                        <td className="p-[1rem]">10</td>
                        <td className="p-[1rem]">
                          {new Date(deck.edited_at).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            },
                          )}
                        </td>
                        <td className="p-[1rem]">
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
                          <button className="mx-auto block">
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
