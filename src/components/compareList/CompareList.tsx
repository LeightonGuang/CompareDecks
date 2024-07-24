"use client";

import { useState } from "react";
import CompareCard from "./CompareCard";
import editIcon from "../../_assets/icons/editIcon.svg";
import Image from "next/image";
import { CardType } from "@/_types/CardType";

const CompareList = ({ name, deckData }: { name: string; deckData: any[] }) => {
  const [deckName, setDeckName] = useState(name);
  const [orderedList, setOrderedList] = useState<CardType[]>(deckData);
  const [pinnedList, setPinnedList] = useState<CardType[]>([]);
  const [unpinnedList, setUnpinnedList] = useState<CardType[]>(deckData);

  const handlePinButton: (objIndex: number) => void = (objIndex) => {
    setPinnedList([...pinnedList, unpinnedList[objIndex]]);
    setUnpinnedList((prevList) =>
      prevList.filter((_obj, index) => index !== objIndex)
    );
  };

  const handleUnpinButton: (objIndex: number) => void = (objIndex) => {
    for (let i: number = 0; i < orderedList.length; i++) {
      const originalEl: CardType = orderedList[i];

      if (pinnedList[objIndex] === originalEl) {
        unpinnedList.splice(i, 0, pinnedList[objIndex]);
        setPinnedList(pinnedList.filter((_obj, index) => index !== objIndex));
        break;
      }
    }
  };

  return (
    <div
      className="pl-mobile-spacing pt-mobile-spacing pr-mobile-spacing"
      id="compare-list"
    >
      <div className="flex gap-[0.5rem] items-center">
        <h2 className="font-bold text-[1.5rem] leading-[2rem]">{deckName}</h2>
        <button className="mx-[0.625rem]">
          <Image src={editIcon} alt="edit icon" height={20} width={20} />
        </button>
      </div>
      <ul
        className="flex flex-row w-full list-none overflow-x-auto scroll-smooth snap-x snap-mandatory"
        id="compare-card-list"
      >
        {pinnedList.map((cardObj, cardIndex) => (
          <li
            className="w-1/2 px-[0.25rem] flex-shrink-0 mb-mobile-spacing snap-start md:w-1/4 xl:w-1/5"
            key={cardIndex}
          >
            <CompareCard
              cardObj={cardObj}
              handlePinButton={handlePinButton}
              handleUnpinButton={handleUnpinButton}
              cardIndex={cardIndex}
              isPinned={true}
            />
          </li>
        ))}
        {unpinnedList.map((cardObj, cardIndex) => (
          <li
            className="w-1/2 px-[0.25rem] flex-shrink-0 mb-mobile-spacing snap-start md:w-1/4 xl:w-1/5"
            key={cardIndex}
          >
            <CompareCard
              cardObj={cardObj}
              handlePinButton={handlePinButton}
              handleUnpinButton={handleUnpinButton}
              cardIndex={cardIndex}
              isPinned={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompareList;
