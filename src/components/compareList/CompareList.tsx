"use client";

import { useState } from "react";
import CompareCard from "./CompareCard";
import editIcon from "../../_assets/icons/editIcon.svg";
import Image from "next/image";

import { CardType } from "@/_types/CardType";
import { DeckType } from "@/_types/DeckType";

const CompareList = ({ deckData }: { deckData?: DeckType | null }) => {
  const orderedList: CardType[] = deckData?.cards || [];
  const [pinnedList, setPinnedList] = useState<CardType[]>([]);
  const [unpinnedList, setUnpinnedList] = useState<CardType[]>(
    deckData?.cards || []
  );
  const [deckName, setDeckName] = useState<string>(deckData?.name || "");
  const [isEditDeckName, setIsEditDeckName] = useState<boolean>(false);
  const [isAddCardModal, setIsAddCardModal] = useState<boolean>(false);

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

  const handleAddCardButton = () => {
    setIsAddCardModal(true);
  };

  const handleEditCardButton = () => {};

  const handleDeleteCardButton = () => {};

  return (
    <div
      className="pl-mobile-spacing pt-mobile-spacing pr-mobile-spacing"
      id="compare-list"
    >
      <div className="flex gap-[0.5rem] items-center" id="compare-list-header">
        {isEditDeckName ? (
          <form
            className="flex gap-[1rem] h-[2rem]"
            onSubmit={onSubmitDeckName}
          >
            <input
              className="border w-[12rem] rounded-[0.375rem]"
              type="text"
              value={deckName}
              onChange={onChangeDeckName}
            />
            <button
              className="bg-[#2563eb] px-[0.5rem] py-[0.25rem] text-[0.75rem] text-white rounded-[0.375rem]"
              type="submit"
            >
              Save
            </button>
          </form>
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
              handleEditCardButton={handleEditCardButton}
              handleDeleteCardButton={handleDeleteCardButton}
            />
          </li>
        ))}
        {unpinnedList.map((cardObj, cardIndex) => (
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
              handleEditCardButton={handleEditCardButton}
              handleDeleteCardButton={handleDeleteCardButton}
            />
          </li>
        ))}
        <li className="w-1/2 px-[0.25rem] flex-shrink-0 mb-mobile-spacing snap-start md:w-1/4 xl:w-1/5">
          <div className="h-[2.5rem] mb-[1rem]" />
          <button
            className="flex items-center justify-center h-max w-full border border-1 border-[#e2e8f0] bg-[#f8fafc] text-[3rem] font-[700] rounded-[0.5rem]"
            onClick={handleAddCardButton}
          >
            <p className="text-[#64748b]">+</p>
          </button>
        </li>
      </ul>

      {isAddCardModal ? (
        <div
          className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
          id="add-card-modal"
        >
          <div id="add-card">
            <button
              className="bg-white"
              onClick={() => setIsAddCardModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        ``
      )}
    </div>
  );
};

export default CompareList;
