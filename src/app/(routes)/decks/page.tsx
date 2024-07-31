"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/config/supabase";
import placeholder from "../../../_assets/images/placeholder.svg";

import { DeckType } from "@/_types/DeckType";

const DecksPage = () => {
  const [deckList, setDeckList] = useState<DeckType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDeckList = async () => {
    try {
      const deckListQuery = await supabase
        .from("decks")
        .select("* ,cards(imgUrl)");

      const { data, error }: { data: DeckType[] | null; error: any } =
        await deckListQuery;

      if (data) {
        setDeckList(data);
        console.log(data);
      }

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDeckList();
  }, []);

  return (
    <main className="h-dynamic-vh">
      <div className="flex justify-center">
        <div className="mx-mobile-spacing max-w-[50rem] overflow-x-auto">
          <h1 className="text-[1.5rem] font[700]">Browse decks</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full table-auto mt-mobile-spacing">
              <thead>
                <tr className="text-left bg-[#f1f5f9]">
                  <th className="py-[0.75rem] px-[1rem]">Preview</th>
                  <th className="py-[0.75rem] px-[1rem]">Deck name</th>
                  <th className="py-[0.75rem] px-[1rem]">User id</th>
                  <th className="py-[0.75rem] px-[1rem]">Date created</th>
                </tr>
              </thead>
              <tbody>
                {deckList.map((deck: DeckType) => (
                  <tr className="text-left border-b h-[2.75rem]" key={deck.id}>
                    {deck.cards[0] && deck.cards[0] ? (
                      <td
                        className="flex justify-center items-center"
                        id="preview-img"
                      >
                        <img
                          className="h-[2.75rem]"
                          src={deck.cards[0].imgUrl}
                          alt="preview"
                        />
                      </td>
                    ) : (
                      <td
                        className="flex justify-center items-center"
                        id="preview-placeholder"
                      >
                        <Image
                          className=" aspect-[16/9] h-[2.75rem] object-cover"
                          src={placeholder}
                          alt="placeholder"
                          height={49}
                        />
                      </td>
                    )}
                    <td className="h-min">
                      <Link
                        className="py-[0.75rem] px-[1rem] whitespace-nowrap underline"
                        href={`/decks/${deck.uuid}`}
                      >
                        {deck.name}
                      </Link>
                    </td>
                    <td className="py-[0.75rem] px-[1rem] h-max-[2.75rem] whitespace-nowrap">
                      {deck.user_uid}
                    </td>
                    <td className="py-[0.75rem] px-[1rem]  h-max-[2.75rem] whitespace-nowrap">
                      {new Date(deck.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};

export default DecksPage;
