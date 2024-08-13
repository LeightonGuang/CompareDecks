interface Props {
  isListView: boolean;
  setIsListView: (arg0: boolean) => void;
}

// https://uxmovement.com/wp-content/uploads/2019/08/toggle_switch-opposing_options.png

const ListViewButton = ({ isListView, setIsListView }: Props) => {
  return (
    <div className="flex" id="button-container">
      {isListView ? (
        <div className="flex">
          <button
            className="whitespace-nowrap rounded-full rounded-r border-b border-l border-t border-[#c4c4c4] bg-white px-[0.5rem] py-[0.25rem] text-[0.75rem] text-[#c4c4c4]"
            onClick={() => setIsListView(false)}
          >
            ▯ Grid View
          </button>
          <div className="border-r border-[#5277b6]" />
          <button className="whitespace-nowrap rounded-full rounded-l border-b border-r border-t border-[#5277b6] bg-[#f2f5fc] px-[0.5rem] py-[0.25rem] text-[0.75rem] text-[#5277b6]">
            ☰ List View
          </button>
        </div>
      ) : (
        <div className="flex">
          <button className="whitespace-nowrap rounded-full rounded-r border-b border-l border-t border-[#5277b6] bg-[#f2f5fc] px-[0.5rem] py-[0.25rem] text-[0.75rem] text-[#5277b6]">
            ▯ Grid View
          </button>
          <div className="border-r border-[#5277b6]" />
          <button
            className="whitespace-nowrap rounded-full rounded-l border-b border-r border-t border-[#c4c4c4] bg-white px-[0.5rem] py-[0.25rem] text-[0.75rem] text-[#c4c4c4]"
            onClick={() => setIsListView(true)}
          >
            ☰ List View
          </button>
        </div>
      )}
    </div>
  );
};

export default ListViewButton;
