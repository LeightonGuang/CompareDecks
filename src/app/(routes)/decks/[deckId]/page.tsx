"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ItemCard from "@/components/createDeck/ItemCard";
import DeckDetails from "@/components/createDeck/DeckDetails";
import CompareTable from "@/components/createDeck/CompareTable";
import AttributeCard from "@/components/createDeck/AttributeCard";
import { getDeckById } from "@/app/actions/DeckContext/getDeckById/actions";
import { TextLoadingAnimation } from "@/components/animation/TextLoadingAnimation";

import { FetchCardType } from "@/_types/FetchCardType";
import { DecksTableType } from "@/_types/DecksTableType";
import { DynamicCardType } from "@/_types/DynamicCardType";
import { FetchDeckDataType } from "@/_types/FetchDeckDataType";
import { AttributeTableType } from "@/_types/AttributeTableType";

interface CardsType {
  id?: number;
  card_order: number;
  name: string;
  imgUrl?: string;
  [key: string]: string | number | undefined;
}

const DeckPage = ({ params }: { params: { deckId: string } }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedDeckData, setFetchedDeckData] = useState<FetchDeckDataType>(
    {} as FetchDeckDataType,
  );
  const [deckData, setDeckData] = useState<DecksTableType>({
    name: "",
    description: "",
  } as DecksTableType);
  const [attributes, setAttributes] = useState<AttributeTableType[]>([]);
  const [cards, setCards] = useState<DynamicCardType[]>([]);
  const [isEditDeckDetials, setIsEditDeckDetials] = useState(false);
  const [errors, setErrors] = useState({
    isMissingDeckName: false,
    isMissingDeckDescription: false,
    isMissingDeckAttributes: false,
    isMissingCardNames: false,
  });

  const handleAddCardButtonClick = () => {
    setCards([...cards, { name: "", imgUrl: "", card_order: cards.length }]);
  };

  const handleSaveButtonClick = () => {};

  // const LoadingSkeleton = () => (
  //   <div className="mt-[1rem] w-full" id="deck-page-loading-card">
  //     <h1 className="h-[2rem] w-[16rem]">
  //       <TextLoadingAnimation />
  //     </h1>
  //     <div className="mt-[1rem] flex h-[34rem] rounded-[0.25rem] bg-[#e0e0e0] p-[1.5rem]">
  //       <ul className="w-[6.5rem]">
  //         <li className="h-[2.5rem]" />
  //         <li className="h-[8rem] border-b border-b-[#c5c5c5] p-[1rem]" />
  //         {Array(5)
  //           .fill(0)
  //           .map((_, index) => (
  //             <li className="border-b border-b-[#c5c5c5] p-[1rem]" key={index}>
  //               <div className="h-[1.3125rem] w-full">
  //                 <TextLoadingAnimation />
  //               </div>
  //             </li>
  //           ))}
  //       </ul>
  //       <ul className="flex">
  //         {Array(5)
  //           .fill(0)
  //           .map((_, index) => (
  //             <li className="w-[10rem]" key={index}>
  //               <ul className="text-center">
  //                 <li className="h-[2.5rem]" />
  //                 <li className="h-[8rem] border-b border-b-[#c5c5c5] p-[0.5rem]">
  //                   <TextLoadingAnimation />
  //                 </li>
  //                 {Array(5)
  //                   .fill(0)
  //                   .map((_, j) => (
  //                     <li
  //                       className="border-b border-b-[#c5c5c5] p-[1rem]"
  //                       key={j}
  //                     >
  //                       <div className="h-[1.3125rem] w-full">
  //                         <TextLoadingAnimation />
  //                       </div>
  //                     </li>
  //                   ))}
  //               </ul>
  //             </li>
  //           ))}
  //       </ul>
  //     </div>
  //   </div>
  // );

  const fetchData = async () => {
    try {
      const { data: deckData, error: deckError } = await getDeckById(
        params.deckId,
      );

      if (deckError) {
        console.error(deckError);
      } else if (deckData) {
        setDeckData({ name: deckData.name, description: deckData.description });
        setAttributes(deckData.attributes);

        const formattedCards = deckData.cards.map((card: FetchCardType) => {
          const cardData: CardsType = {
            id: card.id,
            card_order: card.card_order,
            name: card.name,
            imgUrl: card.imgUrl,
          };

          card.attribute_values.forEach((attribute) => {
            cardData[attribute.attributes.name] = attribute.value;
          });
          return cardData;
        });

        setCards(formattedCards);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="p-4">
      <DeckDetails
        isAuthor={isAuthor}
        isEditDeckDetails={false}
        setIsEditDeckDetails={setIsEditDeckDetials}
        deckData={deckData}
        setDeckData={setDeckData}
      />

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">Cards</h2>

          {isAuthor && (
            <Button
              className="hover:cursor-pointer"
              onClick={handleAddCardButtonClick}
            >
              + Add Card
            </Button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          {isAuthor && (
            <AttributeCard
              attributes={attributes}
              setAttributes={setAttributes}
            />
          )}
          {cards.map((card, i) => {
            return (
              <ItemCard
                key={i}
                isAuthor={isAuthor}
                cardIndex={i}
                attributes={attributes}
                card={card}
                cards={cards}
                setCards={setCards}
              />
            );
          })}
        </div>

        <div className="mt-4">
          <h2 className="mb-4 text-2xl font-medium">Compare Table</h2>
          <CompareTable attributes={attributes} cards={cards} />
        </div>

        <div className="mt-4 flex w-full flex-col items-center justify-center">
          {isAuthor && (
            <Button className="w-max" onClick={handleSaveButtonClick}>
              Save
            </Button>
          )}
          <p className="ml-2 text-red-500">
            {errors.isMissingDeckName
              ? "Deck name is missing"
              : errors.isMissingDeckDescription
                ? "Deck description is missing"
                : errors.isMissingCardNames
                  ? "Card names are missing"
                  : errors.isMissingDeckAttributes
                    ? "Attributes are missing"
                    : ""}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeckPage;
