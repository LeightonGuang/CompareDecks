"use client";

import Image from "next/image";

import unpinIcon from "../../_assets/icons/unpinIcon.svg";
import pinnedIcon from "../../_assets/icons/pinnedIcon.svg";

import { CardTableType } from "@/_types/CardsTableType";
import { DecksTableType } from "@/_types/DecksTableType";
import { AttributeValuesTableType } from "@/_types/AttributeValuesTableType";

interface Props {
  deckData: DecksTableType | undefined;
  pinnedList: CardTableType[];
  handlePinButton: (cardId: number) => void;
  unpinnedList: CardTableType[];
  handleUnpinButton: (cardId: number) => void;
}

const GridViewList = ({
  deckData,
  pinnedList,
  handlePinButton,
  unpinnedList,
  handleUnpinButton,
}: Props) => {
  const Card = ({
    card,
    isPinned,
    cardIndex,
  }: {
    card: CardTableType;
    isPinned: boolean;
    cardIndex: number;
  }) => {
    return (
      <li
        className="w-1/3 flex-shrink-0 snap-start rounded-[0.25rem] hover:bg-gray-300 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[12.5%]"
        id="pinned-cards"
      >
        <button
          className="flex w-full justify-center"
          onClick={() =>
            isPinned ? handleUnpinButton(card.id) : handlePinButton(card.id)
          }
          id="unpin-button"
        >
          <Image
            className="m-[0.625rem] min-h-[1.25rem] min-w-[1.25rem]"
            src={isPinned ? pinnedIcon : unpinIcon}
            alt="pinned icon"
            height={20}
            width={20}
          />
        </button>
        <div
          className="flex h-[4rem] w-full items-center justify-center border-b border-b-[#c5c5c5] bg-black md:h-[6rem] xl:h-[8rem]"
          id="image-container"
        >
          <img
            alt={"card image"}
            className="w-full object-contain"
            src={card.imgUrl}
          />
        </div>
        {card.attribute_values.map(
          (
            _attributeObj: AttributeValuesTableType,
            attributeObjIndex: number,
          ) => (
            <div
              className="min-h-[3.375rem] overflow-x-auto whitespace-nowrap border-b border-b-[#c5c5c5] px-[0.5rem] py-[1rem] text-center text-[0.875rem] font-[400]"
              key={attributeObjIndex}
            >
              {card.attribute_values[attributeObjIndex].value}
            </div>
          ),
        )}
        <div
          className="h-[10rem] overflow-y-auto border-b border-b-[#c5c5c5] px-[0.5rem] py-[1rem] text-[0.875rem] font-[400]"
          id="row"
        >
          <p className="leading-tight">{card.description}</p>
        </div>
      </li>
    );
  };

  const PinnedCards = ({ pinnedCards }: { pinnedCards: CardTableType[] }) => {
    const havePinnedCards = pinnedList.length > 0;

    return (
      havePinnedCards &&
      pinnedCards.map((pinnedCard: CardTableType, cardIndex: number) => (
        <Card key={cardIndex} card={pinnedCard} isPinned={true} cardIndex={cardIndex} />
      ))
    );
  };

  const UnpinnedCards = ({
    unpinnedCards,
  }: {
    unpinnedCards: CardTableType[];
  }) => {
    const haveUnpinnedCards = unpinnedList.length > 0;

    return (
      haveUnpinnedCards &&
      unpinnedCards.map((unpinnedCard: CardTableType, cardIndex: number) => {
        return (
          <Card
            key={cardIndex}
            card={unpinnedCard}
            isPinned={false}
            cardIndex={cardIndex}
          />
        );
      })
    );
  };

  return (
    <div
      className="mt-[1rem] flex rounded-[0.25rem] bg-[#e0e0e0] p-[1.5rem]"
      id="grid-view-list"
    >
      <ul className="mb-[1rem] hidden sm:flex sm:flex-col" id="attribute-names">
        <li>
          <div className="h-[2.5rem]" id="pin-spacer" />
          <div
            className="h-[4rem] border-b border-b-[#c5c5c5] md:h-[6rem] xl:h-[8rem]"
            id="image-spacer"
          />
        </li>
        {deckData?.deck_attributes.map((attributeObj: any, index: number) => (
          <li
            className="border-b border-b-[#c5c5c5] p-[1rem] text-[0.875rem]"
            key={index}
          >
            {attributeObj.attribute}
          </li>
        ))}
        <li className="p-[1rem] text-[0.875rem]">Description</li>
      </ul>
      <ul
        className="scrollbar-top flex min-h-[15rem] w-full snap-x snap-mandatory list-none flex-row overflow-x-auto scroll-smooth pb-[1rem]"
        id="scroll-list"
      >
        <PinnedCards pinnedCards={pinnedList} />
        <UnpinnedCards unpinnedCards={unpinnedList} />
      </ul>
    </div>
  );
};

export default GridViewList;
