"use client";

import { useEffect, useState } from "react";
import GridViewList from "./GridViewList";
import ListViewList from "./ListViewList";
import ListViewButton from "./ListViewButton";

import { CardTableType } from "@/_types/CardsTableType";
import { DecksTableType } from "@/_types/DecksTableType";
import { AttributeValuesTableType } from "@/_types/AttributeValuesTableType";

/* !Required data
  - user info
  - deck info
  - cards
  - deck attributes
*/

const CompareList = ({
  className,
  deckData,
  setDeckData,
}: {
  className?: string;
  deckData: DecksTableType;
  setDeckData: React.Dispatch<React.SetStateAction<DecksTableType>>;
}) => {
  const [isListView, setIsListView] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [pinnedList, setPinnedList] = useState<CardTableType[]>([]);
  const [unpinnedList, setUnpinnedList] = useState<CardTableType[]>([]);
  const [pendingNewCard, setPendingNewCards] = useState<{
    [key: string]: string;
  }>({} as { [key: string]: string });

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

  const AddCardModal = () => {
    const [addCardForm, setAddCardForm] = useState<{
      [key: string]: string;
    }>();

    const onAddCardFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setAddCardForm({
        ...addCardForm,
        [name]: value,
      });
    };

    const handleAddCardButton = () => {
      // each attribute value
      const formattedAttributeValues: AttributeValuesTableType[] =
        Object.entries(addCardForm!).map(([key, value]) => ({
          value: value,
          deck_attributes: { attribute: key },
        }));

      const formattedCard: CardTableType = {
        ...addCardForm,
        order: (deckData.cards?.length ?? 0) + 1,
        attribute_values: formattedAttributeValues,
      };

      setDeckData({
        ...deckData,
        cards: [...(deckData.cards ?? []), formattedCard],
      });

      setShowAddCardModal(false);
    };

    return (
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
        <div
          className="flex w-64 flex-col rounded-md bg-white p-4 md:w-[28rem]"
          id="card"
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Add Card</h1>
              <button
                className="flex h-4 w-4 items-center justify-center rounded-md bg-red-400 p-3 text-red-600"
                onClick={() => setShowAddCardModal(false)}
              >
                X
              </button>
            </div>

            <form
              action={handleAddCardButton}
              className="mt-4 flex flex-col gap-2"
            >
              {deckData?.deck_attributes?.map((attr, i) => (
                <label className="flex flex-col" key={attr?.id ? attr?.id : i}>
                  <span className="font-semibold">{attr.attribute}: </span>
                  <input
                    className="rounded-md border border-[#e0e0e0] p-1"
                    name={attr.attribute}
                    type="text"
                    onChange={onAddCardFormChange}
                  />
                </label>
              ))}
              <button
                className="mt-2 rounded-md bg-[#1d4ed8] p-2 text-white"
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (deckData?.cards) {
      setUnpinnedList(deckData?.cards);
    }
  }, [deckData]);

  return (
    <div className={className}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{deckData?.name}</h1>

          <ListViewButton
            isListView={isListView}
            setIsListView={setIsListView}
          />
        </div>

        {isListView ? (
          <ListViewList
            deckData={deckData}
            setShowAddCardModal={setShowAddCardModal}
            pinnedList={pinnedList}
            handlePinButton={handlePinButton}
            unpinnedList={unpinnedList}
            handleUnpinButton={handleUnpinButton}
          />
        ) : (
          <GridViewList
            deckData={deckData}
            setShowAddCardModal={setShowAddCardModal}
            pinnedList={pinnedList}
            handlePinButton={handlePinButton}
            unpinnedList={unpinnedList}
            handleUnpinButton={handleUnpinButton}
          />
        )}
      </div>

      {showAddCardModal && <AddCardModal />}
    </div>
  );
};

export default CompareList;
