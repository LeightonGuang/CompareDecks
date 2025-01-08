"use client";

import { useEffect, useState } from "react";
import GridViewList from "./GridViewList";
import ListViewList from "./ListViewList";
import ListViewButton from "./ListViewButton";

import { CardTableType } from "@/_types/CardsTableType";
import { DecksTableType } from "@/_types/DecksTableType";

/* !Required data
  - user info
  - deck info
  - cards
  - deck attributes
*/

const CompareList = ({
  deckData,
}: {
  deckData: DecksTableType | undefined;
}) => {
  const [isListView, setIsListView] = useState(false);
  const [pinnedList, setPinnedList] = useState<CardTableType[]>([]);
  const [unpinnedList, setUnpinnedList] = useState<CardTableType[]>([]);

  const handlePinButton = (cardId: number) => {
    const pinnedCard = unpinnedList.find((card) => card.id === cardId);

    setPinnedList([...pinnedList, pinnedCard!]);
    setUnpinnedList(unpinnedList.filter((card) => card.id !== cardId));
  };

  const handleUnpinButton = (cardId: number) => {
    const unpinnedCard = pinnedList.find((card) => card.id === cardId);

    setUnpinnedList([...unpinnedList, unpinnedCard!]);
    setPinnedList(pinnedList.filter((card) => card.id !== cardId));
  };

  useEffect(() => {
    if (deckData) {
      setUnpinnedList(deckData.cards);
      console.log(deckData.cards);
    }
  }, [deckData]);

  return (
    <div className="mt-4 flex flex-col">
      <div className="flex items-center justify-between">
        <h1>{deckData?.name}</h1>

        <ListViewButton isListView={isListView} setIsListView={setIsListView} />
      </div>

      {isListView ? (
        <ListViewList
          deckData={deckData}
          pinnedList={pinnedList}
          handlePinButton={handlePinButton}
          unpinnedList={unpinnedList}
          handleUnpinButton={handleUnpinButton}
        />
      ) : (
        <GridViewList
          deckData={deckData}
          pinnedList={pinnedList}
          handlePinButton={handlePinButton}
          unpinnedList={unpinnedList}
          handleUnpinButton={handleUnpinButton}
        />
      )}
    </div>
  );
};

export default CompareList;
