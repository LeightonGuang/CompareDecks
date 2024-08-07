import { useState } from "react";

import { CardType } from "@/_types/CardType";
import { DeckType } from "@/_types/DeckType";

interface Props {
  orderedList: CardType[];
  unpinnedList: CardType[];
  setIsAddCardModal: any;
  setOrderedList: any;
  setUnpinnedList: any;
}

const AddCardModal = ({
  orderedList,
  unpinnedList,
  setIsAddCardModal,
  setOrderedList,
  setUnpinnedList,
}: Props) => {
  const [formData, setFormData] = useState<CardType>({
    id: 0,
    deck_uuid: "",
    imgUrl: "",
    brand: "",
    name: "",
    year: new Date().getFullYear(),
    price: "",
    description: "",
    created_at: "",
    edited_at: "",
  });

  const [isError, setIsError] = useState({
    name: false,
  });

  const onFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitAddCardForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name === "") {
      console.log("Please enter a name");
      setIsError({ ...isError, name: true });
      return;
    } else {
      setIsError({ ...isError, name: false });
    }
    setOrderedList([...orderedList, formData]);
    setUnpinnedList([...unpinnedList, formData]);
    setIsAddCardModal(false);
  };

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      id="add-card-modal"
    >
      <div
        className="w-[16rem] rounded-[0.375rem] bg-white md:w-[28rem]"
        id="add-card"
      >
        <div
          className="m-[1rem] flex flex-col justify-center gap-[1rem]"
          id="add-card-container"
        >
          <div className="flex items-center justify-between">
            <h1>Add Card</h1>
            <button
              className="rounded-[0.25rem] bg-red-300 px-[0.5rem] py-[0.25rem] text-[0.75rem]"
              onClick={() => setIsAddCardModal(false)}
            >
              Close
            </button>
          </div>
          <img
            className="h-[6rem] rounded-[0.375rem] bg-black object-contain md:h-[10rem]"
            src={formData.imgUrl}
            alt={formData.brand + " " + formData.name}
          />
          <form
            className="flex flex-col gap-[1rem]"
            onSubmit={handleSubmitAddCardForm}
          >
            <div>
              <input
                className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
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
              value={formData.imgUrl}
              onChange={onFormChange}
            />
            <input
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="brand"
              type="text"
              placeholder="Brand"
              value={formData.brand}
              onChange={onFormChange}
            />
            <input
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="price"
              type="text"
              placeholder="Price"
              value={formData.price}
              onChange={onFormChange}
            />
            <input
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="year"
              type="number"
              placeholder="Year"
              value={formData.year}
              onChange={onFormChange}
            />
            <textarea
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={onFormChange}
            />
            <button
              className="rounded-[0.375rem] bg-blue px-[1rem] py-[0.5rem] text-white"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
