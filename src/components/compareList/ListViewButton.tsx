interface Props {
  isListView: boolean;
  handleTableViewToggle: () => void;
}

const ListViewButton = ({ isListView, handleTableViewToggle }: Props) => {
  return (
    <div
      className="flex h-[1.9rem] w-[5.4rem] justify-center rounded-full bg-[#edf2f6]"
      id="button-container"
    >
      <input
        className="relative h-full w-full cursor-pointer appearance-none"
        type="checkbox"
        checked={isListView}
        onChange={handleTableViewToggle}
        id="view-checkbox"
      />
    </div>
  );
};

export default ListViewButton;
