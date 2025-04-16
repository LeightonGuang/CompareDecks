import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { BinIconSvg, EditIconSvg } from "@/_assets/icons/cardIcons";

const ItemCard = ({
  cardIndex,
  attributes,
  card,
  cards,
  setCards,
}: {
  cardIndex: number;
  attributes: string[];
  card: any;
  cards: any[];
  setCards: (cards: any) => void;
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

  return (
    <Card className="w-60">
      <CardHeader className="flex items-center justify-between border-b pb-2">
        <h2 className={`${!card.name && "text-muted-foreground"}`}>
          {isEditing ? (
            <Input
              placeholder="Card name"
              value={card.name}
              onChange={onCardNameChange}
            />
          ) : (
            card.name || "Card " + String(cardIndex + 1)
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
                  alt={card.name}
                  className="object-contain"
                  src={card.imgUrl}
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                  unoptimized
                />
              )}

              {attributes.map((attribute) => {
                const attributeValue = card[attribute];
                return (
                  <div key={attribute} className="flex flex-col gap-2">
                    <label className="text-sm font-medium">{attribute}</label>
                    {isEditing ? (
                      <Input
                        placeholder={`Enter ${attribute}`}
                        value={attributeValue}
                        onChange={(e) => onAttributeValueChange(e, attribute)}
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
                      alt={card.name}
                      className="object-contain"
                      src={card.imgUrl}
                      width={0}
                      height={0}
                      style={{ width: "100%", height: "auto" }}
                      unoptimized
                    />
                  )}

                  {attributes.map((attribute) => {
                    const attributeValue = card[attribute];
                    return (
                      <div key={attribute} className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          {attribute}
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
