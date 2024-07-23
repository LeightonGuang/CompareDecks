"use client";

import { useState } from "react";
import CompareCard from "./CompareCard";
import editIcon from "../../_assets/images/editIcon.svg";

const CompareList = ({ name, deckData }: { name: string; deckData: any[] }) => {
  const [deckName, setDeckName] = useState(name);
  const [deck, setDeck] = useState(deckData);

  return (
    <div className="bg-red-100" id="compare-list">
      <div className="flex gap-[0.5rem]">
        <h2 className="font-bold text-[1.5rem] leading-[2rem]">{deckName}</h2>
        <button className="h-[1.25rem] w-[1.25rem]">
          <img src={editIcon} alt="edit icon" />
        </button>
      </div>
      <ul className="flex flex-row w-full list-none pb-mobile-spacing overflow-x-auto scroll-smooth snap-x snap-mandatory">
        {deck.map((card, cardIndex) => (
          <li className="w-1/2 flex-shrink-0 snap-start" key={cardIndex}>
            <CompareCard imgUrl={card.imgUrl} name={card.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompareList;
