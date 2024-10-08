"use client";

import { useState } from "react";
import binIcon from "@/_assets/icons/binIcon.svg";
import Image from "next/image";

interface Props {
  setShowSetupCreateDeckModal: (arg0: boolean) => void;
}
const SetupCreateDeckModal = ({ setShowSetupCreateDeckModal }: Props) => {
  const [attributeList, setAttributeList] = useState<string[]>([]);

  const handleAddAttribute = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const attribute = formData.get("attribute") as string;
    setAttributeList([...attributeList, attribute]);
    e.currentTarget.reset();
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributeList(attributeList.filter((_, i) => i !== index));
  };

  const handleDone = () => {
    setShowSetupCreateDeckModal(false);
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
        />
        <div
          className="m-[1rem] flex flex-col gap-[1rem]"
          id="setup-create-deck-card-attribute-list"
        >
          {attributeList.map((attribute, index) => (
            <div className="flex justify-between" key={index}>
              <p>{attribute}</p>
              <button onClick={() => handleRemoveAttribute(index)}>
                <Image src={binIcon} alt="bin icon" />
              </button>
            </div>
          ))}
          <form className="flex justify-between" onSubmit={handleAddAttribute}>
            <input
              className="border-E2E8F0 rounded-md border px-[0.75rem] py-[0.5rem] text-[0.875rem]"
              type="text"
              placeholder="Attribute"
              name="attribute"
            />
            <button className="bg-blue" type="submit">
              +
            </button>
          </form>
        </div>
        <button
          className="w-full rounded-md bg-[#3A4FE0] py-[0.5rem] text-[0.875rem] text-white"
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SetupCreateDeckModal;
