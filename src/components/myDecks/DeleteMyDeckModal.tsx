import Image from "next/image";
import deleteCrossIcon from "../../_assets/icons/deleteCrossIcon.svg";

interface Props {
  setShowDeleteModal: (arg0: boolean) => void;
}
const DeleteMyDeckModal = ({ setShowDeleteModal }: Props) => {
  const handleDeleteButton = () => {
    console.log("delete deck");
  };

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      id="delete-my-deck-modal"
    >
      <div
        className="w-[22rem] rounded-[0.375rem] bg-white md:w-[28rem]"
        id="delete-my-deck-card"
      >
        <div className="m-[1rem]" id="delete-my-deck-card-container">
          <div className="flex flex-col items-center justify-center">
            <Image
              className="h-[4rem] w-[4rem]"
              src={deleteCrossIcon}
              alt="warning icon"
              style={{
                filter:
                  "invert(13%) sepia(77%) saturate(6951%) hue-rotate(347deg) brightness(105%) contrast(94%)",
              }}
            />
            <h1 className="mt-[1rem] text-[1.5rem] text-[#636363]">
              Delete deck?
            </h1>
            <p className="mt-[1rem] px-[1rem] text-center text-[0.875rem] text-[#5e6d8c]">
              Are you sure you want to delete this deck? This action cannot be
              undone.
            </p>
          </div>
          <div
            className="mt-[2rem] flex justify-center gap-[1rem]"
            id="delete-my-deck-card-buttons"
          >
            <button
              className="rounded-[0.25rem] bg-[#c1c1c1] px-[2rem] py-[0.5rem] text-white"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-[0.25rem] bg-red-600 px-[2rem] py-[0.5rem] text-white"
              onClick={handleDeleteButton}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMyDeckModal;
