import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { BinIconSvg } from "@/_assets/icons/cardIcons";
import { Card, CardContent, CardHeader } from "../ui/card";

import { AttributeTableType } from "@/_types/AttributeTableType";

// Edit and delete atttributes of a deck
const AttributeCard = ({
  attributes,
  setAttributes,
}: {
  attributes: AttributeTableType[];
  setAttributes: (attributes: AttributeTableType[]) => void;
}) => {
  const [attribute, setAttribute] = useState("");
  const [errors, setErrors] = useState({
    isMissingAttribute: false,
    isDuplicateAttribute: false,
  });

  const onAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttribute(e.target.value);
  };

  const handleAddAttributeButton = () => {
    setErrors({
      isMissingAttribute: false,
      isDuplicateAttribute: false,
    });

    // check if attribute input is empty
    if (!attribute) {
      setErrors((prevErrors) => ({ ...prevErrors, isMissingAttribute: true }));
      return;
    }
    // check if attribute already exists
    const isDuplicateAttribute = attributes.some(
      (attr) => attr.name === attribute,
    );
    if (isDuplicateAttribute) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isDuplicateAttribute: true,
      }));
      return;
    }
    // add new attribute to attributes
    setAttributes([
      ...attributes,
      { name: attribute, sort_order: attributes.length },
    ]);
    setAttribute("");
  };

  const handleDeleteButton = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);
  };

  return (
    <Card className="w-60">
      <CardHeader className="border-b">
        <div className="flex gap-2">
          <Input
            placeholder="Attribute"
            value={attribute}
            onChange={onAttributeChange}
          />
          <Button
            className="hover:cursor-pointer"
            onClick={handleAddAttributeButton}
          >
            + Add
          </Button>
        </div>

        {errors.isMissingAttribute && (
          <p className="mt-1 text-xs text-red-600">
            *Attribute cannot be empty
          </p>
        )}

        {errors.isDuplicateAttribute && (
          <p className="mt-1 text-xs text-red-600">*Attribute already exist</p>
        )}
      </CardHeader>

      <CardContent className="space-y-2">
        <h3 className="text-sm font-medium">Current Attributes:</h3>

        <div className="grid gap-2">
          {attributes.map((attribute, i) => (
            <div
              className="bg-muted/40 flex items-center justify-between rounded-md p-2"
              key={i}
            >
              <span className="font-medium">{attribute.name}</span>

              <Button
                className="hover:cursor-pointer"
                size="icon"
                variant="ghost"
                onClick={() => handleDeleteButton(i)}
              >
                <BinIconSvg className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttributeCard;
