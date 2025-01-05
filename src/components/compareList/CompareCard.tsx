import Image from "next/image";
import unpinIcon from "../../_assets/icons/unpinIcon.svg";
import pinnedIcon from "../../_assets/icons/pinnedIcon.svg";
import editIcon from "../../_assets/icons/editIcon.svg";
import binIcon from "../../_assets/icons/binIcon.svg";

import { CardTableType } from "@/_types/CardsTableType";

interface Props {
  isPinned: boolean;
  isAuth: boolean;
  cardObj: CardTableType;
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
      <div className="mb-mobile-spacing flex w-full justify-end">
        {isPinned ? (
          <button
            className="rounded-[0.375rem] bg-white"
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
            className="rounded-[0.375rem] bg-white"
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
      <div className="border-1 border-[ #E2E8F0] rounded-[0.5rem] border">
        <img
          className="aspect-[16/9] rounded-t-[0.5rem] bg-gray-100 object-contain"
          src={imgUrl}
          alt={name}
        />
        <ul className="m-mobile-spacing flex flex-col gap-[2rem]">
          <li className="text-[1.125rem] font-[600] leading-[1.5rem]">
            {name}
          </li>
          <li className="text-[0.875rem] text-[#5e6d82]">{brand}</li>
          <li>{price}</li>
          <li>{year}</li>
          <li>{description}</li>
          <li>
            {isAuth ? (
              <div className="flex justify-end">
                <button className="flex h-[2.5rem] w-[2.5rem] items-center justify-center">
                  <Image src={editIcon} alt="edit" width={20} height={20} />
                </button>

                <button className="flex h-[2.5rem] w-[2.5rem] items-center justify-center">
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
