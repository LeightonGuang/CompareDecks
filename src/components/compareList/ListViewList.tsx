import Image from "next/image";

import pinnedIcon from "../../_assets/icons/pinnedIcon.svg";
import unpinIcon from "../../_assets/icons/unpinIcon.svg";
import editIcon from "../../_assets/icons/editIcon.svg";
import binIcon from "../../_assets/icons/binIcon.svg";
import { useDeck } from "@/context/DeckContext";

interface Props {
  handlePinButton: (objIndex: number) => void;
  handleUnpinButton: (objIndex: number) => void;
  handleEditCardButton: (cardIndex: number, isPinned: boolean) => void;
  handleAddCardButton: () => void;
  handleDeleteCardButton: (cardIndex: number, isPinned: boolean) => void;
  isAuth: boolean;
}

const ListViewList = ({
  handlePinButton,
  handleUnpinButton,
  handleEditCardButton,
  handleAddCardButton,
  handleDeleteCardButton,
  isAuth,
}: Props) => {
  const { pinnedList, unpinnedList } = useDeck();

  return (
    <div className="w-full overflow-x-auto py-[1rem]" id="table-view-container">
      <table className="w-full">
        <thead className="">
          <tr>
            <th></th>
            <th></th>
            <th className="px-[1rem] text-left">Image</th>
            <th className="px-[1rem] text-left">Name</th>
            <th className="px-[1rem] text-left">Brand</th>
            <th className="px-[1rem] text-left">Year</th>
            <th className="px-[1rem] text-left">Price</th>
            <th className="px-[1rem] text-left">Description</th>
            {isAuth && <th>action</th>}
          </tr>
        </thead>
        <tbody className="">
          {pinnedList.map((cardObj, cardIndex) => (
            <tr
              className={`max-h-[3rem] ${
                cardIndex % 2 === 0 && `bg-[#e0e0e0]`
              }`}
              key={cardIndex}
            >
              <td className="px-[1rem]">{cardIndex + 1}.</td>
              <td className="px-[1rem]">
                <button
                  className="h-[1.25rem] w-[1.25rem]"
                  onClick={() => handleUnpinButton(cardIndex)}
                >
                  <Image
                    className="h-[1.25rem] w-[1.25rem]"
                    src={pinnedIcon}
                    alt="pinned icon"
                  />
                </button>
              </td>
              <td className="px-[1rem]">
                <div className="flex max-h-[4rem] w-[6rem] justify-center bg-black">
                  <img
                    className="h-[4rem] object-contain"
                    src={cardObj.imgUrl}
                    alt={cardObj.brand + " " + cardObj.name}
                    id="item-image"
                  />
                </div>
              </td>
              <td className="whitespace-nowrap px-[1rem]">{cardObj.name}</td>
              <td className="whitespace-nowrap px-[1rem]">{cardObj.brand}</td>
              <td className="whitespace-nowrap px-[1rem]">{cardObj.year}</td>
              <td className="whitespace-nowrap px-[1rem]">{cardObj.price}</td>
              <td className="whitespace-nowrap px-[1rem]">
                <p>{cardObj.description}</p>
              </td>
              {isAuth && (
                <td>
                  <div className="flex justify-center gap-mobile-spacing px-[1rem]">
                    <button
                      onClick={() => handleEditCardButton(cardIndex, true)}
                    >
                      <Image
                        src={editIcon}
                        alt="edit icon"
                        height={20}
                        width={20}
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteCardButton(cardIndex, true)}
                    >
                      <Image
                        src={binIcon}
                        alt="bin icon"
                        height={20}
                        width={20}
                      />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
          {unpinnedList.map((cardObj, cardIndex) => (
            <tr
              className={`max-h-[3rem] ${
                (pinnedList.length + cardIndex) % 2 === 0 && `bg-[#e0e0e0]`
              }`}
              key={cardIndex}
            >
              <td className="px-[1rem]">
                {pinnedList.length + cardIndex + 1}.
              </td>
              <td className="px-[1rem]">
                <button onClick={() => handlePinButton(cardIndex)}>
                  <Image
                    className="min-h-[1.25rem] min-w-[1.25rem]"
                    src={unpinIcon}
                    alt="unpin icon"
                    width={20}
                    height={20}
                  />
                </button>
              </td>
              <td className="px-[1rem]">
                <div className="flex max-h-[4rem] w-[6rem] justify-center bg-black">
                  <img
                    className="h-[4rem] object-contain"
                    src={cardObj.imgUrl}
                    alt={cardObj.brand + " " + cardObj.name}
                    id="item-image"
                  />
                </div>
              </td>
              <td className="whitespace-nowrap px-[1rem]">{cardObj.name}</td>
              <td className="whitespace-nowrap px-[1rem]">{cardObj.brand}</td>
              <td className="whitespace-nowrap px-[1rem]">{cardObj.year}</td>
              <td className="whitespace-nowrap px-[1rem]">{cardObj.price}</td>
              <td className="whitespace-nowrap px-[1rem]">
                <p>{cardObj.description}</p>
              </td>
              {isAuth && (
                <td>
                  <div className="flex justify-center gap-mobile-spacing px-[1rem]">
                    <button
                      onClick={() => handleEditCardButton(cardIndex, false)}
                    >
                      <Image
                        className="min-h-[1.25rem] min-w-[1.25rem]"
                        src={editIcon}
                        alt="edit icon"
                        width={20}
                        height={20}
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteCardButton(cardIndex, false)}
                    >
                      <Image
                        className="min-h-[1.25rem] min-w-[1.25rem]"
                        src={binIcon}
                        alt="bin icon"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListViewList;
