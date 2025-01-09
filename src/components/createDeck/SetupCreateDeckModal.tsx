"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import binIcon from "@/_assets/icons/binIcon.svg";

import { DecksTableType } from "@/_types/DecksTableType";
import { DeckAttributesTableType } from "@/_types/DeckAttributesTableType";

interface Props {
  setShowCreateDeckModal: (arg0: boolean) => void;
  deckData: DecksTableType | undefined;
  setDeckData: (deckData: DecksTableType) => void;
}

interface SetupFormType {
  name: string;
  deck_attributes: Set<string>;
}

const SetupCreateDeckModal = ({
  setShowCreateDeckModal,
  deckData,
  setDeckData,
}: Props) => {
  const router = useRouter();

  const SetupForm = () => {
    const [formData, setFormData] = useState<SetupFormType>({
      name: "",
      deck_attributes: new Set(),
    });
    const [newAttribute, setNewAttribute] = useState<string>("");

    const onDeckNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value;
      setFormData({ ...formData, name });
    };

    const onNewAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const attribute = e.target.value;
      setNewAttribute(attribute);
    };

    const handleAddAttributeButton = () => {
      if (newAttribute === "") {
        alert("Please enter an attribute");
      }
      {
        setFormData({
          ...formData,
          deck_attributes: new Set([
            ...Array.from(formData.deck_attributes),
            newAttribute,
          ]),
        });
        setNewAttribute("");
      }
    };

    const handleRemoveAttributeButton = (index: number) => {
      const filteredAttributeList = new Set(
        Array.from(formData.deck_attributes).filter(
          (_a, aIndex) => aIndex !== index,
        ),
      );

      setFormData({ ...formData, deck_attributes: filteredAttributeList });
    };

    const handleDoneButton = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (formData.name === "") {
        alert("Please enter a deck name");
      } else if (formData.deck_attributes.size === 0) {
        alert("Please add at least one attribute");
      } else {
        const formattedAttributes: DeckAttributesTableType[] = Array.from(
          formData.deck_attributes,
        ).map((attr, attrIndex) => ({
          id: undefined,
          order: attrIndex + 1,
          deck_uuid: "",
          attribute: attr,
          created_at: undefined,
          edited_at: undefined,
        }));

        setDeckData({
          ...deckData,
          id: undefined,
          name: formData.name,
          deck_attributes: formattedAttributes,
        });
        setShowCreateDeckModal(false);
      }
    };

    useEffect(() => {
      console.log(formData);
    }, [formData]);

    return (
      <form className="flex flex-col gap-4" onSubmit={handleDoneButton}>
        <input
          className="rounded-md border border-[E2E8F0] px-3 py-2 text-sm"
          type="text"
          placeholder="Deck Name"
          value={formData.name}
          onChange={onDeckNameChange}
        />

        <ul className="flex flex-col gap-2">
          {formData.deck_attributes.size > 0 &&
            Array.from(formData.deck_attributes).map((attr, index) => (
              <li className="flex justify-between" key={index}>
                <p>{attr}</p>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500"
                  onClick={() => handleRemoveAttributeButton(index)}
                >
                  <Image className="h-4 w-4" src={binIcon} alt="bin icon" />
                </button>
              </li>
            ))}
        </ul>

        <div className="flex justify-between">
          <input
            className="gap-2 rounded-md border border-[E2E8F0] px-[0.75rem] py-2 text-sm"
            type="text"
            placeholder="Add a new attribute"
            value={newAttribute}
            onChange={onNewAttributeChange}
          />
          <button
            className="flex min-h-8 min-w-8 items-center justify-center rounded-lg bg-blue text-white"
            type="button"
            onClick={handleAddAttributeButton}
          >
            +
          </button>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="w-full rounded-md bg-red-600 py-2 text-sm text-white"
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full rounded-md bg-[#3A4FE0] py-2 text-sm text-white"
          >
            Done
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="w-64 rounded-md bg-white p-4 md:w-[28rem]">
        <p className="my-4 text-sm text-[#5E6D82]">
          Setup your deck name and card attributes here.
        </p>

        <div className="my-4 flex flex-col gap-4">
          <SetupForm />
        </div>
      </div>
    </div>
  );
};

export default SetupCreateDeckModal;
