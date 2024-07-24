import { CardType } from "@/_types/CardType";
import Image from "next/image";
import unpinIcon from "../../_assets/icons/unpinIcon.svg";
import pinnedIcon from "../../_assets/icons/pinnedIcon.svg";

const CompareCard = ({ cardObj }: { cardObj: CardType }) => {
  const { imgUrl, name, brand, year, price, description } = cardObj;
  return (
    <div id="compare-card">
      <div className="w-full flex justify-end mb-mobile-spacing">
        <button className="bg-white rounded-[0.375rem]">
          <Image
            className="m-[0.625rem]"
            src={unpinIcon}
            alt="unpin icon"
            height={20}
            width={20}
          />
        </button>
      </div>
      <div className="border border-1 border-[ #E2E8F0] rounded-[0.5rem]">
        <img
          className="object-cover bg-black aspect-[16/9] rounded-t-[0.5rem]"
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
        </ul>
      </div>
    </div>
  );
};

export default CompareCard;
