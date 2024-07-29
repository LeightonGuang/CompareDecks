interface Props {
  setIsAddCardModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCardModal = ({ setIsAddCardModal }: Props) => {
  return (
    <div
      className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
      id="add-card-modal"
    >
      <div id="add-card">
        <button className="bg-white" onClick={() => setIsAddCardModal(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddCardModal;
