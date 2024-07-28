"use client";

import { DeckType } from "@/_types/DeckType";
import { supabase } from "@/config/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

type NewDeckType = Omit<DeckType, "cards">;

const Decks = () => {
  const [deckList, setDeckList] = useState<NewDeckType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDeckList = async () => {
    try {
      const deckListQuery = await supabase.from("decks").select("*");

      const { data, error }: { data: NewDeckType[] | null; error: any } =
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
          <h1 className="text-[1.5rem] font[700]">List of decks</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full table-auto mt-mobile-spacing">
              <thead>
                <tr className="text-left bg-[#f1f5f9]">
                  <th className="py-[0.75rem] px-[1rem]">Preview</th>
                  <th className="py-[0.75rem] px-[1rem]">Name</th>
                  <th className="py-[0.75rem] px-[1rem]">uuid</th>
                  <th className="py-[0.75rem] px-[1rem]">User id</th>
                  <th className="py-[0.75rem] px-[1rem]">Date created</th>
                </tr>
              </thead>
              <tbody>
                {deckList.map((deck) => (
                  <tr className="text-left border-b" key={deck.id}>
                    <td>
                      <img src="" alt="" />
                    </td>
                    <td>
                      <Link
                        className="py-[0.75rem] px-[1rem] whitespace-nowrap"
                        href={`/decks/${deck.uuid}`}
                      >
                        {deck.name}
                      </Link>
                    </td>
                    <td className="py-[0.75rem] px-[1rem] whitespace-nowrap">
                      {deck.uuid}
                    </td>
                    <td className="py-[0.75rem] px-[1rem] whitespace-nowrap">
                      {deck.user_id}
                    </td>
                    <td className="py-[0.75rem] px-[1rem] whitespace-nowrap">
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

export default Decks;
