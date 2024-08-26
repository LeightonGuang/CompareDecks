import { CardType } from "@/_types/CardType";
import React, { useState } from "react";

interface Props {
  cardFormData: CardType | null;
  orderedList: CardType[];
  setOrderedList: any;
  pinnedList: CardType[];
  setPinnedList: any;
  unpinnedList: CardType[];
  setUnpinnedList: any;
  setIsEditCardModal: any;
}
const EditCardModal = ({
  cardFormData,
  orderedList,
  setOrderedList,
  pinnedList,
  setPinnedList,
  unpinnedList,
  setUnpinnedList,
  setIsEditCardModal,
}: Props) => {
  const [editFormData, setEditFormData] = useState<CardType | null>(cardFormData);

  const [isError, setIsError] = useState({
    name: false,
  });

  const onFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value } as CardType);
  };

  const handleSumbitEditCardForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editFormData?.name === "") {
      console.log("Please enter a name");
      setIsError({ ...isError, name: true });
      return;
    } else {
      if (cardFormData) {
        const newOrderedList = [...orderedList];
        const orderedListIndex = orderedList.indexOf(cardFormData);

        const indexInPinnedList = pinnedList.indexOf(cardFormData);
        const indexInUnpinnedList = unpinnedList.indexOf(cardFormData);

        if (editFormData) {
          newOrderedList[orderedListIndex] = editFormData;
          setOrderedList(newOrderedList);

          if (indexInPinnedList !== -1) {
            const newPinnedList = [...pinnedList];
            newPinnedList[indexInPinnedList] = editFormData;
            setPinnedList(newPinnedList);
          } else if (indexInUnpinnedList !== -1) {
            const newUnpinnedList = [...unpinnedList];
            newUnpinnedList[indexInUnpinnedList] = editFormData;
            setUnpinnedList(newUnpinnedList);
          }
          setIsError({ ...isError, name: false });
          setIsEditCardModal(false);
        }
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
              onClick={() => setIsEditCardModal(false)}
            >
              Close
            </button>
          </div>
          <img
            className="h-[6rem] rounded-[0.375rem] bg-black object-contain md:h-[10rem]"
            src={editFormData?.imgUrl}
            alt={editFormData?.brand + " " + editFormData?.name}
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
                value={editFormData?.name}
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
              value={editFormData?.imgUrl}
              onChange={onFormChange}
            />
            <input
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="brand"
              type="text"
              placeholder="Brand"
              value={editFormData?.brand}
              onChange={onFormChange}
            />
            <input
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="price"
              type="text"
              placeholder="Price"
              value={editFormData?.price}
              onChange={onFormChange}
            />
            <input
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="year"
              type="number"
              placeholder="Year"
              value={editFormData?.year}
              onChange={onFormChange}
            />
            <textarea
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="description"
              placeholder="Description"
              value={editFormData?.description}
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
