"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import CompareCard from "./CompareCard";
import editIcon from "../../_assets/icons/editIcon.svg";
import Image from "next/image";

import { CardType } from "@/_types/CardType";
import { DeckType } from "@/_types/DeckType";

const CompareList = ({ deckData }: { deckData: DeckType }) => {
  const orderedList: CardType[] = deckData.cards;
  const [pinnedList, setPinnedList] = useState<CardType[]>([]);
  const [unpinnedList, setUnpinnedList] = useState<CardType[]>(deckData.cards);
  const [deckName, setDeckName] = useState<string>(deckData.name);
  const [isEditDeckName, setIsEditDeckName] = useState<boolean>(false);

  const handlePinButton: (objIndex: number) => void = (objIndex) => {
    setPinnedList([...pinnedList, unpinnedList[objIndex]]);
    setUnpinnedList((prevList) =>
      prevList.filter((_obj, index) => index !== objIndex)
    );
  };

  const handleUnpinButton = (objIndex: number) => {
    const itemToUnpin = pinnedList[objIndex];
    setPinnedList((prevList) =>
      prevList.filter((_obj, index) => index !== objIndex)
    );

    const originalIndex = orderedList.findIndex(
      (item) => item.id === itemToUnpin.id
    );

    setUnpinnedList((prevList) => {
      const newList = [...prevList];
      newList.splice(originalIndex, 0, itemToUnpin);
      return newList;
    });
  };

  const handleEditDeckName = () => {
    setIsEditDeckName(true);
  };

  const onChangeDeckName = (e: any) => {
    setDeckName(e.target.value);
  };

  const onSubmitDeckName = (e: any) => {
    e.preventDefault();
    setIsEditDeckName(false);
  };

  return (
    <div
      className="pl-mobile-spacing pt-mobile-spacing pr-mobile-spacing"
      id="compare-list"
    >
      <div className="flex gap-[0.5rem] items-center">
        {isEditDeckName ? (
          <>
            <form className="flex gap-[0.5rem]" onSubmit={onSubmitDeckName}>
              <input
                className="border rounded-[0.375rem]"
                type="text"
                value={deckName}
                onChange={onChangeDeckName}
              />
              <button type="submit">Save</button>
            </form>
          </>
        ) : (
          <>
            <h2 className="font-bold text-[1.5rem] leading-[2rem]">
              {deckName}
            </h2>
            <button className="mx-[0.625rem]" onClick={handleEditDeckName}>
              <Image src={editIcon} alt="edit icon" height={20} width={20} />
            </button>
          </>
        )}
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
              isPinned={true}
              cardObj={cardObj}
              cardIndex={cardIndex}
              handlePinButton={handlePinButton}
              handleUnpinButton={handleUnpinButton}
            />
          </li>
        ))}
        {unpinnedList.map((cardObj, cardIndex) => (
          <li
            className="w-1/2 px-[0.25rem] flex-shrink-0 mb-mobile-spacing snap-start md:w-1/4 xl:w-1/5"
            key={cardIndex}
          >
            <CompareCard
              isPinned={false}
              cardObj={cardObj}
              cardIndex={cardIndex}
              handlePinButton={handlePinButton}
              handleUnpinButton={handleUnpinButton}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompareList;
