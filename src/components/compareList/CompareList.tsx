"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import AddCardModal from "./AddCardModal";
import EditCardModal from "./EditCardModal";
import GridViewList from "./GridViewList";
import ListViewList from "./ListViewList";
import ListViewButton from "./ListViewButton";
import { useDeck } from "@/context/DeckContext";
import editIcon from "../../_assets/icons/editIcon.svg";

import { CardType } from "@/_types/CardType";

const CompareList = () => {
  const { user } = useUser();
  const { deckData } = useDeck();
  const isAuth = user?.aud === "authenticated";
  const [isLoading, setIsLoading] = useState(true);
  const [cardFormData, setCardFormData] = useState<CardType | null>(null);
  const [orderedList, setOrderedList] = useState<CardType[]>([]);
  const [pinnedList, setPinnedList] = useState<CardType[]>([]);
  const [unpinnedList, setUnpinnedList] = useState<CardType[]>([]);
  const [deckName, setDeckName] = useState<string>("");
  const [isEditDeckName, setIsEditDeckName] = useState<boolean>(false);
  const [isListView, setIsListView] = useState<boolean>(false);
  const [isAddCardModal, setIsAddCardModal] = useState<boolean>(false);
  const [isEditCardModal, setIsEditCardModal] = useState<boolean>(false);

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

  const handleEditCardButton = (cardIndex: number, isPinned: boolean) => {
    setIsEditCardModal(true);
    if (isPinned) {
      setCardFormData(pinnedList[cardIndex]);
    } else if (!isPinned) {
      setCardFormData(unpinnedList[cardIndex]);
    }
  };

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

  const updateDeckState = async () => {
    setOrderedList(deckData?.cards ?? []);
    setUnpinnedList(deckData?.cards ?? []);
    setDeckName(deckData?.name ?? "");
    setIsLoading(false);
  };

  useEffect(() => {
    if (deckData) {
      // console.log(deckData);
      updateDeckState();
    }
  }, [deckData]);

  return (
    <>
      {!isLoading && (
        <div id="compare-list">
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
                    <button
                      className="mx-[0.625rem]"
                      onClick={handleEditDeckName}
                    >
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
            <ListViewButton
              isListView={isListView}
              setIsListView={setIsListView}
            />
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
              isAuth={isAuth}
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
              isAuth={isAuth}
            />
          )}
          {isAddCardModal && (
            <AddCardModal
              orderedList={orderedList}
              unpinnedList={unpinnedList}
              setIsAddCardModal={setIsAddCardModal}
              setOrderedList={setOrderedList}
              setUnpinnedList={setUnpinnedList}
            />
          )}
          {isEditCardModal && (
            <EditCardModal
              cardFormData={cardFormData}
              orderedList={orderedList}
              setOrderedList={setOrderedList}
              pinnedList={pinnedList}
              setPinnedList={setPinnedList}
              unpinnedList={unpinnedList}
              setUnpinnedList={setUnpinnedList}
              setIsEditCardModal={setIsEditCardModal}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CompareList;
