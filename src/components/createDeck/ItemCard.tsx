import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { BinIconSvg, EditIconSvg } from "@/_assets/icons/cardIcons";

import { AttributeTableType } from "@/_types/AttributeTableType";
import { DynamicCardType } from "@/_types/DynamicCardType";

const ItemCard = ({
  cardIndex,
  attributes,
  card,
  cards,
  setCards,
}: {
  cardIndex: number;
  attributes: AttributeTableType[];
  card: DynamicCardType;
  cards: DynamicCardType[];
  setCards: (cards: DynamicCardType[]) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const onCardNameChange = (e: any) => {
    const name = e.target.value;
    const updatedCard = {
      ...card,
      name,
    };
    // update card name in cards
    cards.splice(cardIndex, 1, updatedCard);
    setCards([...cards]);
  };

  const onAttributeValueChange = (e: any, attribute: string) => {
    const attributeValue = e.target.value;
    const updatedCard = {
      ...card,
      [attribute]: attributeValue,
    };

    cards.splice(cardIndex, 1, updatedCard);
    setCards([...cards]);
  };

  const onCardImageChange = (e: any) => {
    const imgUrl = e.target.value;
    const updatedCard = {
      ...card,
      imgUrl,
    };
    cards.splice(cardIndex, 1, updatedCard);
    setCards([...cards]);
  };

  const handleDeleteButton = () => {
    cards.splice(cardIndex, 1);
    setCards([...cards]);
  };

  // Update card attributes when deck attributes change
  useEffect(() => {
    // TODO: Add new attributes to all cards

    const updatedCards: DynamicCardType[] = cards.map((card) => {
      const updatedCard = { ...card };
      attributes.forEach((attribute) => {
        if (!updatedCard[attribute.name]) {
          updatedCard[attribute.name] = "";
        }
      });

      return updatedCard;
    });
    setCards(updatedCards);
  }, [attributes]);

  return (
    <Card className="w-60">
      <CardHeader className="flex items-center justify-between border-b pb-2">
        <h2 className={`${card?.name && "text-muted-foreground"}`}>
          {isEditing ? (
            <Input
              placeholder="Card name"
              value={card?.name}
              onChange={onCardNameChange}
            />
          ) : (
            card?.name || "Card " + String(cardIndex + 1)
          )}
        </h2>

        <div className="flex gap-2">
          <Button
            className="hover:cursor-pointer"
            size="icon"
            variant="ghost"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            <EditIconSvg className="h-4 w-4" />
          </Button>

          <Button
            className="hover:cursor-pointer"
            size="icon"
            variant="ghost"
            onClick={handleDeleteButton}
          >
            <BinIconSvg className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          {isEditing ? (
            <>
              <label className="text-sm font-medium">{`Image URL (optional)`}</label>
              <Input
                placeholder="Enter image URL"
                value={card.imgUrl}
                onChange={onCardImageChange}
              />

              {card.imgUrl && (
                <Image
                  alt={card.name || ""}
                  className="object-contain"
                  src={card.imgUrl}
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                  unoptimized
                />
              )}

              {attributes.map((attribute) => {
                const attributeValue = card[attribute.name] || "";
                return (
                  <div key={attribute.name} className="flex flex-col gap-2">
                    <label className="text-sm font-medium">
                      {attribute.name}
                    </label>
                    {isEditing ? (
                      <Input
                        placeholder={`Enter ${attribute.name}`}
                        value={String(attributeValue)}
                        onChange={(e) =>
                          onAttributeValueChange(e, attribute.name)
                        }
                      />
                    ) : (
                      <span
                        className={`bg-muted/30 min-h-[2.5rem] p-2 ${!attributeValue && "text-muted-foreground italic"}`}
                      >
                        {attributeValue ? attributeValue : "Not specified"}
                      </span>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <div>
              {attributes.length === 0 ? (
                <p className="text-muted-foreground text-center italic">
                  No attributes to compare, Add Attributes using the attribute
                  card.
                </p>
              ) : (
                <div className="space-y-4">
                  {card.imgUrl && (
                    <Image
                      alt={card.name || ""}
                      className="object-contain"
                      src={card.imgUrl}
                      width={0}
                      height={0}
                      style={{ width: "100%", height: "auto" }}
                      unoptimized
                    />
                  )}

                  {attributes.map((attribute) => {
                    const attributeValue = card[attribute.name] || "";
                    return (
                      <div key={attribute.name} className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          {attribute.name}
                        </label>
                        <span
                          className={`bg-muted/30 min-h-[2.5rem] p-2 ${!attributeValue && "text-muted-foreground italic"}`}
                        >
                          {attributeValue ? attributeValue : "Not specified"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
