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

  const onFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitAddCardForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOrderedList([...orderedList, formData]);
    setUnpinnedList([...unpinnedList, formData]);
    setIsAddCardModal(false);
  };

  return (
    <div
      className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
      id="add-card-modal"
    >
      <div className="bg-white max-w[28rem] rounded-[0.375rem]" id="add-card">
        <div
          className="flex flex-col gap-[1rem] m-[1rem]"
          id="add-card-container"
        >
          <div className="flex justify-between">
            <h1>Add Card</h1>
            <button
              className="bg-white"
              onClick={() => setIsAddCardModal(false)}
            >
              Close
            </button>
          </div>

          <img
            className="w-full max-h-[5rem] rounded-[0.375rem]"
            src={formData.imgUrl}
            alt={formData.brand + " " + formData.name}
          />
          <form
            className="flex flex-col gap-[1rem]"
            onSubmit={handleSubmitAddCardForm}
          >
            <input
              className="p-[0.5rem] rounded-[0.375rem] leading-[1.375rem] border border-[#E4E4EB] w-full"
              name="imgUrl"
              type="url"
              placeholder="Image URL"
              value={formData.imgUrl}
              onChange={onFormChange}
            />
            <input
              className="p-[0.5rem] rounded-[0.375rem] leading-[1.375rem] border border-[#E4E4EB] w-full"
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={onFormChange}
            />
            <input
              className="p-[0.5rem] rounded-[0.375rem] leading-[1.375rem] border border-[#E4E4EB] w-full"
              name="brand"
              type="text"
              placeholder="Brand"
              value={formData.brand}
              onChange={onFormChange}
            />
            <input
              className="p-[0.5rem] rounded-[0.375rem] leading-[1.375rem] border border-[#E4E4EB] w-full"
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={onFormChange}
            />
            <input
              className="p-[0.5rem] rounded-[0.375rem] leading-[1.375rem] border border-[#E4E4EB] w-full"
              name="year"
              type="number"
              placeholder="Year"
              value={formData.year}
              onChange={onFormChange}
            />
            <textarea
              className="p-[0.5rem] rounded-[0.375rem] leading-[1.375rem] border border-[#E4E4EB] w-full"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={onFormChange}
            />

            <button className="" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
