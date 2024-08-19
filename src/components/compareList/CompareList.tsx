"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import AddCardModal from "./AddCardModal";
import GridViewList from "./GridViewList";
import ListViewList from "./ListViewList";
import ListViewButton from "./ListViewButton";

import editIcon from "../../_assets/icons/editIcon.svg";

import { CardType } from "@/_types/CardType";
import { DeckType } from "@/_types/DeckType";

const CompareList = ({ deckData }: { deckData: DeckType | null }) => {
  const { user } = useUser();
  const [orderedList, setOrderedList] = useState<CardType[]>(
    deckData?.cards || [],
  );
  const [pinnedList, setPinnedList] = useState<CardType[]>([]);
  const [unpinnedList, setUnpinnedList] = useState<CardType[]>(
    deckData?.cards || [],
  );
  const [deckName, setDeckName] = useState<string>(deckData?.name || "");
  const [isEditDeckName, setIsEditDeckName] = useState<boolean>(false);
  const [isListView, setIsListView] = useState<boolean>(false);
  const [isAddCardModal, setIsAddCardModal] = useState<boolean>(false);

  const handlePinButton: (objIndex: number) => void = (objIndex) => {
    setPinnedList([...pinnedList, unpinnedList[objIndex]]);
    setUnpinnedList((prevList) =>
      prevList.filter((_obj, index) => index !== objIndex),
    );
  };

  const handleUnpinButton = (objIndex: number) => {
    const itemToUnpin = pinnedList[objIndex];
    setPinnedList((prevList) =>
      prevList.filter((_obj, index) => index !== objIndex),
    );

    const originalIndex = orderedList.findIndex(
      (item) => item.id === itemToUnpin.id,
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

  const onSubmitEditDeck = () => {};

  const handleEditCardButton = () => {};

  const handleDeleteCardButton = (cardIndex: number, isPinned: boolean) => {
    if (isPinned) {
      setPinnedList((prevList) =>
        prevList.filter((_obj, index) => index !== cardIndex),
      );
    } else if (!isPinned) {
      setUnpinnedList((prevList) =>
        prevList.filter((_obj, index) => index !== cardIndex),
      );
    }
  };

  return (
    <div>
      <div
        className="mt-[1rem] flex items-center justify-between"
        id="compare-list-header"
      >
        <div className="flex items-center gap-[0.5rem]">
          {isEditDeckName ? (
            <form
              className="flex h-[2rem] gap-[1rem]"
              onSubmit={onSubmitDeckName}
            >
              <input
                className="w-[12rem] rounded-[0.375rem] border"
                type="text"
                value={deckName}
                onChange={onChangeDeckName}
              />
              <button
                className="rounded-[0.375rem] bg-[#2563eb] px-[0.5rem] py-[0.25rem] text-[0.75rem] text-white"
                type="submit"
              >
                Save
              </button>
            </form>
          ) : (
            <>
              <h2 className="text-[1.5rem] font-bold leading-[2rem]">
                {deckName}
              </h2>
              {user && user?.id === deckData?.user_uid ? (
                <button className="mx-[0.625rem]" onClick={handleEditDeckName}>
                  <Image
                    src={editIcon}
                    alt="edit icon"
                    height={20}
                    width={20}
                  />
                </button>
              ) : (
                ""
              )}
            </>
          )}
        </div>
        <ListViewButton isListView={isListView} setIsListView={setIsListView} />
      </div>
      {!isListView ? (
        <GridViewList
          pinnedList={pinnedList}
          unpinnedList={unpinnedList}
          handlePinButton={handlePinButton}
          handleUnpinButton={handleUnpinButton}
          handleEditCardButton={handleEditCardButton}
          handleAddCardButton={handleAddCardButton}
          handleDeleteCardButton={handleDeleteCardButton}
        />
      ) : (
        <ListViewList
          pinnedList={pinnedList}
          unpinnedList={unpinnedList}
          handlePinButton={handlePinButton}
          handleUnpinButton={handleUnpinButton}
          handleEditCardButton={handleEditCardButton}
          handleAddCardButton={handleAddCardButton}
          handleDeleteCardButton={handleDeleteCardButton}
        />
      )}
      {isAddCardModal && (
        <AddCardModal
          orderedList={pinnedList}
          unpinnedList={unpinnedList}
          setIsAddCardModal={setIsAddCardModal}
          setOrderedList={setOrderedList}
          setUnpinnedList={setUnpinnedList}
        />
      )}
    </div>
  );
};

export default CompareList;
