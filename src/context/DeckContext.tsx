"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { CardType } from "@/_types/CardType";
import { DeckType } from "@/_types/DeckType";

// use data from here to show in CompareList

interface DeckContextType {
  originalDeckData: DeckType;
  setOriginalDeckData: React.Dispatch<React.SetStateAction<DeckType>>;
  pendingDeckData: DeckType;
  setPendingDeckData: React.Dispatch<React.SetStateAction<DeckType>>;
  orderedList: CardType[];
  setOrderedList: React.Dispatch<React.SetStateAction<CardType[]>>;
  pinnedList: CardType[];
  setPinnedList: React.Dispatch<React.SetStateAction<CardType[]>>;
  unpinnedList: CardType[];
  setUnpinnedList: React.Dispatch<React.SetStateAction<CardType[]>>;
  getAllDecks: () => Promise<
    { success: boolean; error: any; decks: DeckType[] | null } | undefined
  >;
  getDeckById: (
    uuid: string,
  ) => Promise<
    { success: boolean; error: any; data: DeckType[] | null } | undefined
  >;
  getDecksByUserId: (
    userId: string,
  ) => Promise<
    { success: boolean; error: any; decks: DeckType[] | null } | undefined
  >;
  createDeck: (
    deckData: DeckType,
  ) => Promise<{ success: boolean; deck_uuid?: string; error?: string }>;
  deleteDeck: (deckId: string) => Promise<{ success: boolean }>;
}

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const DeckProvider = ({ children }: { children: React.ReactNode }) => {
  const [originalDeckData, setOriginalDeckData] = useState<DeckType>(
    {} as DeckType,
  );
  const [pendingDeckData, setPendingDeckData] = useState<DeckType>(
    {} as DeckType,
  );
  const [orderedList, setOrderedList] = useState<CardType[]>([]);
  const [pinnedList, setPinnedList] = useState<CardType[]>([]);
  const [unpinnedList, setUnpinnedList] = useState<CardType[]>([]);

  // update orderedList when pendingDeckData changes
  useEffect(() => {
    setOrderedList(pendingDeckData.cards);
  }, [pendingDeckData]);

  const value = {
    originalDeckData,
    setOriginalDeckData,
    pendingDeckData,
    setPendingDeckData,
    orderedList,
    setOrderedList,
    pinnedList,
    setPinnedList,
    unpinnedList,
    setUnpinnedList,
    getAllDecks: async () => {
      try {
        const response = await fetch(`/api/DeckContext/getAllDecksList`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { allDecksList, error } = await response.json();

        if (response.ok) {
          return {
            success: true,
            error: null,
            decks: allDecksList,
          };
        } else if (!response.ok) {
          console.error("error from response", error);
          return { success: false, error, decks: null };
        }
      } catch (error) {
        console.error(error);
        return { success: false, error, decks: null };
      }
    },
    getDeckById: async (uuid: string) => {
      try {
        const response = await fetch("/api/DeckContext/getDeckById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid,
          }),
        });

        const responseData = await response.json();

        if (response.ok) {
          return { success: true, error: null, data: responseData.data };
        } else if (!responseData.ok) {
          return { success: false, error: responseData.error, data: null };
        }
      } catch (error) {
        return { success: false, error, data: null };
      }
    },
    getDecksByUserId: async (userId: string) => {
      try {
        const response = await fetch("/api/DeckContext/getDecksByUserId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        });

        const responseData = await response.json();

        if (response.ok) {
          return { success: true, error: null, decks: responseData.data };
        } else if (!responseData.ok) {
          return { success: false, error: responseData.error, decks: null };
        }
      } catch (error) {
        return { success: false, error, decks: null };
      }
    },
    createDeck: async (deckData: DeckType) => {
      try {
        const response = await fetch("/api/DeckContext/createDeck", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deckData,
          }),
        });

        const responseData = await response.json();
        console.log("responseData: ", responseData);

        if (response.ok) {
          return { success: true, deck_uuid: responseData.deck_uuid };
        } else if (!response.ok) {
          return { success: false, error: responseData.error };
        }

        return responseData.data;
      } catch (error) {
        return { success: false, error: error };
      }
    },
    deleteDeck: async (deckId: string) => {
      try {
        const response = await fetch("/api/DeckContext/deleteDeck", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deckId: deckId,
          }),
        });

        if (response.ok) {
          return {
            success: true,
          };
        }

        return { success: false };
      } catch (error) {
        return { success: false };
      }
    },
  };
  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
};

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (context === undefined) {
    throw new Error("useDeck must be used within a DeckProvider");
  }
  return context;
};
