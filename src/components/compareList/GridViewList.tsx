import Image from "next/image";

import pinnedIcon from "../../_assets/icons/pinnedIcon.svg";
import unpinIcon from "../../_assets/icons/unpinIcon.svg";
import editIcon from "../../_assets/icons/editIcon.svg";
import binIcon from "../../_assets/icons/binIcon.svg";
import { useDeck } from "@/context/DeckContext";

import { CardType } from "@/_types/CardType";
import { ListViewProps } from "@/_types/ListViewProps";
import { AttributeValuesType } from "@/_types/AttributeValuesType";

const GridViewList = ({
  attributeList,
  handlePinButton,
  handleUnpinButton,
  handleEditCardButton,
  handleAddCardButton,
  handleDeleteCardButton,
  isAuth,
}: ListViewProps) => {
  const { pinnedList, unpinnedList } = useDeck();

  return (
    <div
      className="mt-[1rem] flex rounded-[0.25rem] bg-[#e0e0e0] p-[1.5rem]"
      id="column-view-container"
    >
      <ul className="mb-[1rem] hidden sm:flex sm:flex-col" id="category-names">
        <li>
          <div className="h-[2.5rem]" id="pin-spacer" />
          <div
            className="h-[4rem] border-b border-b-[#c5c5c5] md:h-[6rem] xl:h-[8rem]"
            id="image-spacer"
          />
        </li>
        {attributeList.map((attributeObj: any, index: number) => (
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
        {pinnedList.map((pinnedCardObj: CardType, cardIndex: number) => (
          <li
            className="w-1/3 flex-shrink-0 snap-start rounded-[0.25rem] hover:bg-gray-300 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[12.5%]"
            key={cardIndex}
            id="pinned-cards"
          >
            <button
              className="flex w-full justify-center"
              onClick={() => handleUnpinButton(cardIndex)}
              id="unpin-button"
            >
              <Image
                className="m-[0.625rem] min-h-[1.25rem] min-w-[1.25rem]"
                src={pinnedIcon}
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
                className="w-full object-contain"
                src={pinnedCardObj.imgUrl}
                alt=""
              />
            </div>
            {pinnedCardObj.attribute_values.map(
              (
                _attributeObj: AttributeValuesType,
                attributeObjIndex: number,
              ) => (
                <div
                  className="min-h-[3.375rem] overflow-x-auto whitespace-nowrap border-b border-b-[#c5c5c5] px-[0.5rem] py-[1rem] text-center text-[0.875rem] font-[400]"
                  key={attributeObjIndex}
                >
                  {
                    pinnedCardObj.attribute_values.find(
                      (attributeValue: AttributeValuesType) =>
                        attributeValue.deck_attributes.attribute ===
                        attributeList[attributeObjIndex]?.attribute,
                    )?.value
                  }
                </div>
              ),
            )}
            <div
              className="h-[10rem] overflow-y-auto border-b border-b-[#c5c5c5] px-[0.5rem] py-[1rem] text-center text-[0.875rem] font-[400]"
              id="row"
            >
              {pinnedCardObj.description}
            </div>
            {isAuth && (
              <div className="flex justify-center gap-[1rem] p-[1rem] sm:gap-[2rem]">
                <button onClick={() => handleEditCardButton(cardIndex, true)}>
                  <Image
                    src={editIcon}
                    alt="edit icon"
                    height={20}
                    width={20}
                  />
                </button>
                <button onClick={() => handleDeleteCardButton(cardIndex, true)}>
                  <Image
                    src={binIcon}
                    alt="delete icon"
                    height={20}
                    width={20}
                  />
                </button>
              </div>
            )}
          </li>
        ))}
        {unpinnedList.map((unpinnedCardObj: CardType, cardIndex: number) => {
          return (
            <li
              className="w-1/3 flex-shrink-0 snap-start rounded-[0.25rem] hover:bg-gray-300 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[12.5%]"
              key={cardIndex}
              id="unpinned-card"
            >
              <button
                className="flex w-full justify-center"
                onClick={() => handlePinButton(cardIndex)}
              >
                <Image
                  className="m-[0.625rem]"
                  src={unpinIcon}
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
                  className="h-min w-full object-contain"
                  src={unpinnedCardObj.imgUrl}
                  alt=""
                />
              </div>
              {unpinnedCardObj.attribute_values.map(
                (
                  _attributeObj: AttributeValuesType,
                  attributeObjIndex: number,
                ) => (
                  <div
                    className="min-h-[3.375rem] overflow-x-auto whitespace-nowrap border-b border-b-[#c5c5c5] px-[0.5rem] py-[1rem] text-center text-[0.875rem] font-[400]"
                    key={attributeObjIndex}
                  >
                    {
                      unpinnedCardObj.attribute_values.find(
                        (attributeValue: AttributeValuesType) =>
                          attributeValue.deck_attributes.attribute ===
                          attributeList[attributeObjIndex]?.attribute,
                      )?.value
                    }
                  </div>
                ),
              )}
              <div
                className="h-[10rem] overflow-y-auto border-b border-b-[#c5c5c5] px-[0.5rem] py-[1rem] text-center text-[0.875rem] font-[400]"
                id="row"
              >
                {unpinnedCardObj.description}
              </div>
              {isAuth && (
                <div className="flex justify-center gap-[1rem] p-[1rem] sm:gap-[2rem]">
                  <button
                    onClick={() => handleEditCardButton(cardIndex, false)}
                  >
                    <Image
                      src={editIcon}
                      alt="edit icon"
                      height={20}
                      width={20}
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteCardButton(cardIndex, false)}
                  >
                    <Image
                      src={binIcon}
                      alt="delete icon"
                      height={20}
                      width={20}
                    />
                  </button>
                </div>
              )}
            </li>
          );
        })}
        {isAuth && (
          <li className="flex h-full w-1/3 flex-shrink-0 snap-start items-center justify-center rounded-[0.25rem] border border-[#c5c5c5] hover:bg-gray-300 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[12.5%]">
            <button
              className="h-full w-full text-[4rem] font-[400]"
              onClick={() => handleAddCardButton()}
            >
              <span>+</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default GridViewList;
