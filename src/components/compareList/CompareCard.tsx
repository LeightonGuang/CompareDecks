import Image from "next/image";
import unpinIcon from "../../_assets/icons/unpinIcon.svg";
import pinnedIcon from "../../_assets/icons/pinnedIcon.svg";
import editIcon from "../../_assets/icons/editIcon.svg";
import binIcon from "../../_assets/icons/binIcon.svg";

import { CardType } from "@/_types/CardType";

interface Props {
  isPinned: boolean;
  isAuth: boolean;
  cardObj: CardType;
  cardIndex: number;
  handlePinButton: (objIndex: number) => void;
  handleUnpinButton: (objIndex: number) => void;
  handleEditCardButton: () => void;
  handleDeleteCardButton: () => void;
}

const CompareCard = ({
  isPinned,
  isAuth,
  cardObj,
  cardIndex,
  handlePinButton,
  handleUnpinButton,
  handleEditCardButton,
  handleDeleteCardButton,
}: Props) => {
  const { imgUrl, name, brand, year, price, description } = cardObj;

  return (
    <div id="compare-card">
      <div className="w-full flex justify-end mb-mobile-spacing">
        {isPinned ? (
          <button
            className="bg-white rounded-[0.375rem]"
            onClick={() => handleUnpinButton(cardIndex)}
          >
            <Image
              className="m-[0.625rem]"
              src={pinnedIcon}
              alt="unpin icon"
              height={20}
              width={20}
            />
          </button>
        ) : (
          <button
            className="bg-white rounded-[0.375rem]"
            onClick={() => handlePinButton(cardIndex)}
          >
            <Image
              className="m-[0.625rem]"
              src={unpinIcon}
              alt="unpin icon"
              height={20}
              width={20}
            />
          </button>
        )}
      </div>
      <div className="border border-1 border-[ #E2E8F0] rounded-[0.5rem]">
        <img
          className="object-contain bg-gray-100 aspect-[16/9] rounded-t-[0.5rem]"
          src={imgUrl}
          alt={name}
        />
        <ul className="flex flex-col gap-[2rem] m-mobile-spacing">
          <li className="font-[600] leading-[1.5rem] text-[1.125rem]">
            {name}
          </li>
          <li className="text-[0.875rem] text-[#5e6d82]">{brand}</li>
          <li>{price}</li>
          <li>{year}</li>
          <li>{description}</li>
          <li>
            {isAuth ? (
              <div className="flex justify-end">
                <button className="flex items-center justify-center w-[2.5rem] h-[2.5rem]">
                  <Image src={editIcon} alt="edit" width={20} height={20} />
                </button>

                <button className="flex items-center justify-center w-[2.5rem] h-[2.5rem]">
                  <Image src={binIcon} alt="delete" width={20} height={20} />
                </button>
              </div>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompareCard;
