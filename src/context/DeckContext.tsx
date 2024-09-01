"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { CardType } from "@/_types/CardType";
import { DeckType } from "@/_types/DeckType";

// use data from here to show in CompareList

interface DeckContextType {
  deckData: DeckType | null;
  setDeckData: React.Dispatch<React.SetStateAction<DeckType | null>>;
  orderedList: CardType[];
  setOrderedList: React.Dispatch<React.SetStateAction<CardType[]>>;
  pinnedList: CardType[];
  setPinnedList: React.Dispatch<React.SetStateAction<CardType[]>>;
  unpinnedList: CardType[];
  setUnpinnedList: React.Dispatch<React.SetStateAction<CardType[]>>;
}

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const DeckProvider = ({ children }: { children: React.ReactNode }) => {
  const [deckData, setDeckData] = useState<DeckType | null>(null);
  const [orderedList, setOrderedList] = useState<CardType[]>(
    deckData?.cards || [],
  );
  const [pinnedList, setPinnedList] = useState<CardType[]>([]);
  const [unpinnedList, setUnpinnedList] = useState<CardType[]>(
    deckData?.cards || [],
  );

  useEffect(() => {
    console.log("deckData updated to: ", deckData);
  }, [deckData]);

  const value = {
    deckData,
    setDeckData,
    orderedList,
    setOrderedList,
    pinnedList,
    setPinnedList,
    unpinnedList,
    setUnpinnedList,
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