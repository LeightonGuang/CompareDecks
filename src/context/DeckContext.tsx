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
  getDeckById: (
    uuid: string,
  ) => Promise<
    { success: boolean; error: any; data: DeckType[] | null } | undefined
  >;
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
    getDeckById: async (uuid: string) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid,
        }),
      };

      const response = await fetch("/api/DeckContext/getDeckById", options);
      const responseData = await response.json();

      if (response.ok) {
        return { success: true, error: null, data: responseData.data };
      } else if (!responseData.ok) {
        return { success: false, error: responseData.error, data: null };
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
