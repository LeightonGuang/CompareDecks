import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EditIconSvg } from "@/_assets/icons/cardIcons";
import { Card, CardContent, CardHeader } from "../ui/card";

import { DecksTableType } from "@/_types/DecksTableType";

const DeckDetails = ({
  isEditDeckDetails,
  setIsEditDeckDetails,
  deckData,
  setDeckData,
}: {
  isEditDeckDetails: boolean;
  setIsEditDeckDetails: (isEditDeckDetails: boolean) => void;
  deckData: DecksTableType;
  setDeckData: (deckData: DecksTableType) => void;
}) => {
  const onDeckNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const deckName = e.target.value;
    setDeckData({
      ...deckData,
      name: deckName,
    });
  };

  const onDeckDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const deckDescription = e.target.value;
    setDeckData({
      ...deckData,
      description: deckDescription,
    });
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          {isEditDeckDetails ? (
            <Input
              className="text-xl font-bold"
              placeholder="Enter deck name"
              value={deckData.name}
              onChange={onDeckNameChange}
            />
          ) : (
            <h2
              className={`text-xl font-bold ${!deckData.name && "text-muted-foreground"}`}
            >
              {deckData.name || "Untilted Deck"}
            </h2>
          )}

          <Button
            className="hover:cursor-pointer"
            size="icon"
            title="Edit Deck Details"
            variant="ghost"
            onClick={() => {
              setIsEditDeckDetails(!isEditDeckDetails);
            }}
          >
            <EditIconSvg className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {isEditDeckDetails ? (
          <Input
            placeholder="Enter deck description"
            value={deckData.description}
            onChange={onDeckDescriptionChange}
          />
        ) : (
          <p className={`text-muted-foreground`}>
            {deckData.description || "Add description for this deck"}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DeckDetails;
