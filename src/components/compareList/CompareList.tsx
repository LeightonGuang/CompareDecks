"use client";

import { useState } from "react";
import CompareCard from "./CompareCard";
import editIcon from "../../_assets/icons/editIcon.svg";
import Image from "next/image";

const CompareList = ({ name, deckData }: { name: string; deckData: any[] }) => {
  const [deckName, setDeckName] = useState(name);
  const [deckDataList, setDeckDataList] = useState(deckData);

  return (
    <div
      className="pl-mobile-spacing pt-mobile-spacing pr-mobile-spacing"
      id="compare-list"
    >
      <div className="flex gap-[0.5rem] items-center">
        <h2 className="font-bold text-[1.5rem] leading-[2rem]">{deckName}</h2>
        <button className="mx-[0.625rem]">
          <Image src={editIcon} alt="edit icon" height={20} width={20} />
        </button>
      </div>
      <ul className="flex flex-row w-full list-none overflow-x-auto scroll-smooth snap-x snap-mandatory">
        {deckDataList.map((cardObj, cardIndex) => (
          <li
            className="w-1/2 px-[0.25rem] flex-shrink-0 mb-mobile-spacing snap-start md:w-1/4 xl:w-1/5"
            key={cardIndex}
          >
            <CompareCard cardObj={cardObj} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompareList;
