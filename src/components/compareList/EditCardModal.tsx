import { CardTableType } from "@/_types/CardsTableType";
import { useDeck } from "@/context/DeckContext";
import React, { useState } from "react";

interface Props {
  cardFormData: CardTableType | null;
  setCardFormData: any;
  setIsShowEditCardModal: any;
}
const EditCardModal = ({
  cardFormData,
  setCardFormData,
  setIsShowEditCardModal,
}: Props) => {
  const {
    orderedList,
    setOrderedList,
    pinnedList,
    setPinnedList,
    unpinnedList,
    setUnpinnedList,
  } = useDeck();
  const [isError, setIsError] = useState({
    name: false,
  });

  const onFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCardFormData({ ...cardFormData, [name]: value } as CardTableType);
  };

  const handleSumbitEditCardForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("cardFormData", cardFormData);

    const isFormNameEmpty = cardFormData?.name === "";
    if (isFormNameEmpty) {
      console.log("Please enter a name");
      setIsError({ ...isError, name: true });
      return;
    } else {
      if (cardFormData) {
        const isInPinnedList = pinnedList.some(
          (card) => card.id === cardFormData.id,
        );
        const isInUnpinnedList = unpinnedList.some(
          (card) => card.id === cardFormData.id,
        );

        if (isInPinnedList) {
          const updatedPinnedList = pinnedList.map((card) =>
            card.id === cardFormData.id ? cardFormData : card,
          );
          setPinnedList(updatedPinnedList);
        } else if (isInUnpinnedList) {
          const updatedUnpinnedList = unpinnedList.map((card) =>
            card.id === cardFormData.id ? cardFormData : card,
          );
          setUnpinnedList(updatedUnpinnedList);
        }

        const updatedOrderedList = orderedList.map((card) =>
          card.id === cardFormData.id ? cardFormData : card,
        );

        setOrderedList(updatedOrderedList);
        console.table(pinnedList);
        console.table(unpinnedList);
        setIsError({ ...isError, name: false });
        setIsShowEditCardModal(false);
      }
    }
  };

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      id="edit-card-modal"
    >
      <div
        className="w-[16rem] rounded-[0.375rem] bg-white md:w-[28rem]"
        id="edit-card"
      >
        <div
          className="m-[1rem] flex flex-col justify-center gap-[1rem]"
          id="edit-card-container"
        >
          <div className="flex items-center justify-between">
            <h1>Edit Card</h1>
            <button
              className="rounded-[0.25rem] bg-red-300 px-[0.5rem] py-[0.25rem] text-[0.75rem]"
              onClick={() => setIsShowEditCardModal(false)}
            >
              Close
            </button>
          </div>
          <img
            className="h-[6rem] rounded-[0.375rem] bg-black object-contain md:h-[10rem]"
            src={cardFormData?.imgUrl}
            alt={cardFormData?.brand + " " + cardFormData?.name}
          />
          <form
            className="flex flex-col gap-[1rem]"
            onSubmit={handleSumbitEditCardForm}
          >
            <div>
              <input
                className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
                name="name"
                type="text"
                placeholder="Name"
                value={cardFormData?.name}
                onChange={onFormChange}
              />
              {isError.name && (
                <div className="ml-[0.5rem] mt-[0.5rem] text-[0.75rem] text-red-500">
                  Please enter a name
                </div>
              )}
            </div>
            <input
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="imgUrl"
              type="url"
              placeholder="Image URL"
              value={cardFormData?.imgUrl}
              onChange={onFormChange}
            />
            <input
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="brand"
              type="text"
              placeholder="Brand"
              value={cardFormData?.brand}
              onChange={onFormChange}
            />
            <input
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="price"
              type="text"
              placeholder="Price"
              value={cardFormData?.price}
              onChange={onFormChange}
            />
            <input
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="year"
              type="number"
              placeholder="Year"
              value={cardFormData?.year}
              onChange={onFormChange}
            />
            <textarea
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="description"
              placeholder="Description"
              value={cardFormData?.description}
              onChange={onFormChange}
            />
            <button
              className="rounded-[0.375rem] bg-blue px-[1rem] py-[0.5rem] text-white"
              type="submit"
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCardModal;
