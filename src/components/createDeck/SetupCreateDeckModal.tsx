"use client";

import { useState } from "react";
import binIcon from "@/_assets/icons/binIcon.svg";
import Image from "next/image";
import { useDeck } from "@/context/DeckContext";
import { DeckAttributesType } from "@/_types/DeckAttributesType";
import { CardType } from "@/_types/CardType";

interface Props {
  setShowSetupCreateDeckModal: (arg0: boolean) => void;
}
const SetupCreateDeckModal = ({ setShowSetupCreateDeckModal }: Props) => {
  const {
    attributeNames,
    setAttrtibuteNames,
    pendingDeckData,
    setPendingDeckData,
  } = useDeck();
  const [deckName, setDeckName] = useState("");
  const [attributeList, setAttributeList] = useState<string[]>([]);

  const handleDeckNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckName(e.target.value);
  };

  const handleAddAttributeToList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const attribute = formData.get("attribute") as string;
    if (attribute.trim() === "") return;
    setAttributeList([...attributeList, attribute]);
    e.currentTarget.reset();
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributeList(attributeList.filter((_, i) => i !== index));
  };

  const handleDeckSetupDone = () => {
    if (deckName === "") {
      alert("Please enter a deck name");
    } else if (attributeList.length === 0) {
      alert("Please add at least one attribute");
    } else {
      // TODO set the attribute list in pending deck data
      setPendingDeckData({ ...pendingDeckData, name: deckName });
      const newAttrNames = attributeList.map((attr) => ({
        id: 0,
        deck_uuid: "",
        attribute: attr,
        created_at: "",
        edited_at: "",
      }));
      setAttrtibuteNames(newAttrNames);
      setShowSetupCreateDeckModal(false);
    }
  };
  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      id="setup-create-deck-modal"
    >
      <div
        className="w-[16rem] rounded-[0.375rem] bg-white p-[1rem] md:w-[28rem]"
        id="setup-create-deck-card"
      >
        <input
          className="border-E2E8F0 rounded-md border px-[0.75rem] py-[0.5rem] text-[0.875rem]"
          type="text"
          placeholder="Deck Name"
          name="deckName"
          value={deckName}
          onChange={handleDeckNameOnChange}
        />
        <p className="my-[1rem] text-[0.875rem] text-[#5E6D82]">
          {`Setup your deck name and card attributes here.`}
        </p>
        <div
          className="my-[1rem] flex flex-col gap-[1rem]"
          id="setup-create-deck-card-attribute-list"
        >
          {attributeList.map((attr, index) => (
            <div className="flex justify-between" key={index}>
              <p>{attr}</p>
              <button
                className="flex h-[2rem] w-[2rem] items-center justify-center rounded-[0.5rem] bg-red-500"
                onClick={() => handleRemoveAttribute(index)}
              >
                <Image
                  className="h-[1rem] w-[1rem]"
                  src={binIcon}
                  alt="bin icon"
                />
              </button>
            </div>
          ))}
          <form
            className="flex items-center gap-[1rem]"
            onSubmit={handleAddAttributeToList}
          >
            <input
              className="border-E2E8F0 w-full rounded-md border px-[0.75rem] py-[0.5rem] text-[0.875rem]"
              type="text"
              placeholder="Add a new attribute"
              name="attribute"
            />
            <button
              className="flex min-h-[2rem] min-w-[2rem] items-center justify-center rounded-[0.5rem] bg-blue text-white"
              type="submit"
            >
              +
            </button>
          </form>
        </div>
        <button
          className="w-full rounded-md bg-[#3A4FE0] py-[0.5rem] text-[0.875rem] text-white"
          onClick={handleDeckSetupDone}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SetupCreateDeckModal;
