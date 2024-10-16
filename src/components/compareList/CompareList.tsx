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
import { DeckAttributesType } from "@/_types/DeckAttributesType";

const CompareList = () => {
  const { user } = useUser();
  const {
    orderedList,
    setOrderedList,
    pinnedList,
    setPinnedList,
    unpinnedList,
    setUnpinnedList,
    pendingDeckData,
    setPendingDeckData,
  } = useDeck();
  const isAuth = user?.aud === "authenticated";
  const [isLoading, setIsLoading] = useState(true);
  const [cardFormData, setCardFormData] = useState<CardType | null>(null);
  const [deckName, setDeckName] = useState<string>("");
  const [attributeList, setAttributeList] = useState<DeckAttributesType[]>([]);
  const [isEditDeckName, setIsEditDeckName] = useState<boolean>(false);
  const [isListView, setIsListView] = useState<boolean>(false);
  const [isShowAddCardModal, setIsShowAddCardModal] = useState<boolean>(false);
  const [isShowEditCardModal, setIsShowEditCardModal] =
    useState<boolean>(false);

  const getDeckAttributes = async (deck_uuid: string) => {
    try {
      const response = await fetch(`/api/getDeckAttributes`, {
        method: "POST",
        body: JSON.stringify({
          deck_uuid: deck_uuid,
        }),
      });
      const data = await response.json();

      if (data.deckAttributes) {
        setAttributeList(data.deckAttributes);
      } else {
        setAttributeList([]);
      }
    } catch (error) {
      console.error("Error fetching deck attributes:", error);
      setAttributeList([]);
    }
  };

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

  const onDeckNameChange = (e: any) => {
    setDeckName(e.target.value);
  };

  const handleDeckNameSubmit = (e: any) => {
    e.preventDefault();
    setPendingDeckData({ ...pendingDeckData, name: deckName });
    setIsEditDeckName(false);
  };

  const handleAddCardButton = () => {
    setIsShowAddCardModal(true);
  };

  const handleEditCardButton = (cardIndex: number, isPinned: boolean) => {
    setIsShowEditCardModal(true);
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

  const updateDeckState = () => {
    const sortedData = pendingDeckData.cards.sort(
      (a, b) => (a?.id ?? 0) - (b?.id ?? 0),
    );
    setOrderedList(sortedData ?? []);
    setUnpinnedList(sortedData ?? []);
    setDeckName(pendingDeckData.name);
  };

  useEffect(() => {
    const isPendingDeckDataNotEmpty = Object.keys(pendingDeckData).length !== 0;
    if (isPendingDeckDataNotEmpty) updateDeckState();

    getDeckAttributes(pendingDeckData.uuid);
    setIsLoading(false);
  }, [pendingDeckData]);

  return (
    <>
      {!isLoading && (
        <div id="compare-list">
          <div
            className="mt-[1rem] flex items-center justify-between"
            id="compare-list-header"
          >
            <div
              className="flex items-center gap-[0.5rem]"
              id="compare-list-title"
            >
              {isEditDeckName ? (
                <form
                  className="flex h-[2rem] gap-[1rem]"
                  onSubmit={handleDeckNameSubmit}
                >
                  <input
                    className="w-[12rem] rounded-[0.375rem] border"
                    onChange={onDeckNameChange}
                    value={deckName}
                    type="text"
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
                    {pendingDeckData.name ? pendingDeckData.name : ""}
                  </h2>
                  {user && user?.id === pendingDeckData?.user_uid ? (
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
              attributeList={attributeList}
              handlePinButton={handlePinButton}
              handleUnpinButton={handleUnpinButton}
              handleEditCardButton={handleEditCardButton}
              handleAddCardButton={handleAddCardButton}
              handleDeleteCardButton={handleDeleteCardButton}
              isAuth={isAuth}
            />
          ) : (
            <ListViewList
              attributeList={attributeList}
              handlePinButton={handlePinButton}
              handleUnpinButton={handleUnpinButton}
              handleEditCardButton={handleEditCardButton}
              handleAddCardButton={handleAddCardButton}
              handleDeleteCardButton={handleDeleteCardButton}
              isAuth={isAuth}
            />
          )}
          {isShowAddCardModal && (
            <AddCardModal setIsShowAddCardModal={setIsShowAddCardModal} />
          )}
          {isShowEditCardModal && (
            <EditCardModal
              cardFormData={cardFormData}
              setCardFormData={setCardFormData}
              setIsShowEditCardModal={setIsShowEditCardModal}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CompareList;
