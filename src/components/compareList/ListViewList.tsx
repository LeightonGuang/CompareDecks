import Image from "next/image";
import unpinIcon from "../../_assets/icons/unpinIcon.svg";
import pinnedIcon from "../../_assets/icons/pinnedIcon.svg";

import { CardTableType } from "@/_types/CardsTableType";
import { DecksTableType } from "@/_types/DecksTableType";

interface Props {
  deckData: DecksTableType | undefined;
  pinnedList: CardTableType[];
  handlePinButton: (cardId: number) => void;
  unpinnedList: CardTableType[];
  handleUnpinButton: (cardId: number) => void;
}

const ListViewList = ({
  deckData,
  pinnedList,
  handlePinButton,
  unpinnedList,
  handleUnpinButton,
}: Props) => {
  const Row = ({
    card,
    isPinned,
    cardIndex,
  }: {
    card: CardTableType;
    isPinned: boolean;
    cardIndex: number;
  }) => {
    return (
      <tr className={`max-h-[3rem] ${cardIndex % 2 === 0 && `bg-[#e0e0e0]`}`}>
        <td className="px-[1rem]">{card.order}.</td>

        <td className="px-[1rem]">
          <button
            className="h-[1.25rem] w-[1.25rem]"
            onClick={() =>
              isPinned ? handleUnpinButton(card.id) : handlePinButton(card.id)
            }
          >
            <Image
              className="h-[1.25rem] w-[1.25rem]"
              src={isPinned ? pinnedIcon : unpinIcon}
              alt={isPinned ? "pinned icon" : "unpinned icon"}
            />
          </button>
        </td>

        <td className="px-[1rem]">
          <div className="flex max-h-[4rem] w-[6rem] justify-center bg-black">
            <img
              className="h-[4rem] object-contain"
              src={card.imgUrl}
              alt={"card image"}
              id="item-image"
            />
          </div>
        </td>

        {card.attribute_values.map((attribute, attributeIndex) => (
          <td key={attributeIndex}>{attribute.value}</td>
        ))}

        <td className="whitespace-nowrap px-[1rem]">
          <p>{card.description}</p>
        </td>
      </tr>
    );
  };

  const PinnedRows = ({ pinnedrows }: { pinnedrows: CardTableType[] }) => {
    const havePinnedRows = pinnedList.length > 0;

    return (
      havePinnedRows &&
      pinnedrows.map((cardObj, cardIndex) => (
        <Row
          key={cardIndex}
          card={cardObj}
          isPinned={true}
          cardIndex={cardIndex}
        />
      ))
    );
  };

  const UnpinnedRows = ({
    unpinnedrows,
  }: {
    unpinnedrows: CardTableType[];
  }) => {
    const haveUnpinnedRows = unpinnedrows.length > 0;

    return (
      haveUnpinnedRows &&
      unpinnedrows.map((cardObj, cardIndex) => (
        <Row
          key={cardIndex}
          card={cardObj}
          isPinned={false}
          cardIndex={cardIndex}
        />
      ))
    );
  };

  return (
    <div className="w-full overflow-x-auto py-4" id="table-view-container">
      <table className="w-full">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            {deckData?.deck_attributes.map((attribute) => {
              return <th key={attribute.id}>{attribute.attribute}</th>;
            })}
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          <PinnedRows pinnedrows={pinnedList} />
          <UnpinnedRows unpinnedrows={unpinnedList} />
        </tbody>
      </table>
    </div>
  );
};

export default ListViewList;
