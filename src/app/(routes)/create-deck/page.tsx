"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ItemCard from "@/components/createDeck/ItemCard";
import DeckDetails from "@/components/createDeck/DeckDetails";
import CompareTable from "@/components/createDeck/CompareTable";
import AttributeCard from "@/components/createDeck/AttributeCard";

import { CardTableType } from "@/_types/CardsTableType";
import { DecksTableType } from "@/_types/DecksTableType";
import { AttributeTableType } from "@/_types/AttributeTableType";

const CreateDeckPage = () => {
  const [isEditDeckDetails, setIsEditDeckDetails] = useState(false);
  const [deckData, setDeckData] = useState<DecksTableType>({
    name: "",
    description: "",
  } as DecksTableType);
  const [attributes, setAttributes] = useState<AttributeTableType[]>([
    { name: "Brand", sort_order: 0 },
    { name: "Price", sort_order: 1 },
  ]);
  const [cards, setCards] = useState<CardTableType[]>([
    { name: "", imgUrl: "", card_order: 0 },
  ]);
  const [errors, setErrors] = useState({
    isMissingDeckName: false,
    isMissingDeckDescription: false,
    isMissingDeckAttributes: false,
    isMissingCardNames: false,
  });

  const handleAddCardButtonClick = () => {
    setCards([...cards, { name: "", imgUrl: "", card_order: cards.length }]);
  };

  const handleSaveButtonClick = () => {
    setErrors({
      isMissingDeckName: false,
      isMissingDeckDescription: false,
      isMissingDeckAttributes: false,
      isMissingCardNames: false,
    });
    // TODO : check deck name is not empty
    if (deckData.name === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isMissingDeckName: true,
      }));
      return;
    }
    // TODO : check deck description is not empty
    if (deckData.description === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isMissingDeckDescription: true,
      }));
      return;
    }
    // TODO : check attributes are not empty
    if (attributes.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isMissingDeckAttributes: true,
      }));
      return;
    }
    // TODO : check cards name are not empty
    if (cards.some((card) => card.name === "")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isMissingCardNames: true,
      }));
      return;
    }
  };

  useEffect(() => {
    console.log("cards: ", cards);
  }, [cards]);

  useEffect(() => {
    console.log("attributes: ", attributes);
  }, [attributes]);

  return (
    <section className="p-4">
      <DeckDetails
        isEditDeckDetails={isEditDeckDetails}
        setIsEditDeckDetails={setIsEditDeckDetails}
        deckData={deckData}
        setDeckData={setDeckData}
      />

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">Cards</h2>

          <Button
            className="hover:cursor-pointer"
            onClick={handleAddCardButtonClick}
          >
            + Add Card
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <AttributeCard
            attributes={attributes}
            setAttributes={setAttributes}
          />
          {cards.map((card, i) => {
            return (
              <ItemCard
                key={i}
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
          <Button className="w-max" onClick={handleSaveButtonClick}>
            Save
          </Button>
          <p className="ml-2 text-red-500">
            {errors.isMissingDeckName
              ? "Deck names are missing"
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

export default CreateDeckPage;
