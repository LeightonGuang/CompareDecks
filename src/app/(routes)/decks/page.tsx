"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import placeholder from "../../../_assets/images/placeholder.svg";

import { DeckType } from "@/_types/DeckType";

const DecksPage = () => {
  const [deckList, setDeckList] = useState<DeckType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDeckList = async () => {
    try {
      const supabase = createClient();
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
          <h1 className="font[700] text-[1.5rem]">Browse decks</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="mt-mobile-spacing w-full table-auto">
              <thead>
                <tr className="bg-[#f1f5f9] text-left">
                  <th className="px-[1rem] py-[0.75rem]">Preview</th>
                  <th className="px-[1rem] py-[0.75rem]">Deck name</th>
                  <th className="px-[1rem] py-[0.75rem]">User id</th>
                  <th className="px-[1rem] py-[0.75rem]">Date created</th>
                </tr>
              </thead>
              <tbody>
                {deckList.map((deck: DeckType) => (
                  <tr className="h-[2.75rem] border-b text-left" key={deck.id}>
                    {deck.cards[0] && deck.cards[0] ? (
                      <td
                        className="flex items-center justify-center"
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
                        className="flex items-center justify-center"
                        id="preview-placeholder"
                      >
                        <Image
                          className="aspect-[16/9] h-[2.75rem] object-cover"
                          src={placeholder}
                          alt="placeholder"
                          height={49}
                        />
                      </td>
                    )}
                    <td className="h-min">
                      <Link
                        className="whitespace-nowrap px-[1rem] py-[0.75rem] underline"
                        href={`/decks/${deck.uuid}`}
                      >
                        {deck.name}
                      </Link>
                    </td>
                    <td className="h-max-[2.75rem] whitespace-nowrap px-[1rem] py-[0.75rem]">
                      {deck.user_uid}
                    </td>
                    <td className="h-max-[2.75rem] whitespace-nowrap px-[1rem] py-[0.75rem]">
                      {new Date(deck.created_at).toLocaleDateString("en-GB", {
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
