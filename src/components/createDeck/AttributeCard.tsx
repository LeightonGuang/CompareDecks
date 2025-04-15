import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { BinIconSvg } from "@/_assets/icons/cardIcons";
import { Card, CardContent, CardHeader } from "../ui/card";

// Edit and delete atttributes of a deck
const AttributeCard = ({
  attributes,
  setAttributes,
}: {
  attributes: string[];
  setAttributes: (attributes: string[]) => void;
}) => {
  const [attribute, setAttribute] = useState("");

  const onAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttribute(e.target.value);
  };

  const handleAddAttributeButton = () => {
    // check if attribute is empty
    if (!attribute) return;
    // check if attribute already exists
    if (attributes.includes(attribute)) return;
    setAttributes([...attributes, attribute]);
    setAttribute("");
  };

  const handleDeleteButton = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);
  };

  return (
    <Card className="w-60">
      <CardHeader>
        <div className="flex gap-4">
          <Input
            placeholder="Attribute"
            value={attribute}
            onChange={onAttributeChange}
          />
          <Button onClick={handleAddAttributeButton}>+ Add</Button>
        </div>
      </CardHeader>

      <CardContent>
        <h3 className="text-sm font-medium">Current Attributes:</h3>

        <div className="flex flex-col gap-2">
          {attributes.map((attribute, i) => (
            <div className="flex items-center justify-between" key={i}>
              <span className="font-medium">{attribute}</span>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDeleteButton(i)}
              >
                <BinIconSvg className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttributeCard;
