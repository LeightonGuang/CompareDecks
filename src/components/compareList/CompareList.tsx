"use client";

import { useEffect, useState } from "react";
import CompareCard from "./CompareCard";
import Image from "next/image";
import AddCardModal from "./AddCardModal";
import getUser from "@/utils/getUser";

import ListViewButton from "./ListViewButton";
import pinnedIcon from "../../_assets/icons/pinnedIcon.svg";
import unpinIcon from "../../_assets/icons/unpinIcon.svg";
import editIcon from "../../_assets/icons/editIcon.svg";
import binIcon from "../../_assets/icons/binIcon.svg";

import { CardType } from "@/_types/CardType";
import { DeckType } from "@/_types/DeckType";

const CompareList = ({ deckData }: { deckData: DeckType | null }) => {
  const [user, setUser] = useState<any>(null);
  const [orderedList, setOrderedList] = useState<CardType[]>(
    deckData?.cards || [],
  );
  const [pinnedList, setPinnedList] = useState<CardType[]>([]);
  const [unpinnedList, setUnpinnedList] = useState<CardType[]>(
    deckData?.cards || [],
  );
  const [deckName, setDeckName] = useState<string>(deckData?.name || "");
  const [isEditDeckName, setIsEditDeckName] = useState<boolean>(false);
  const [isListView, setIsListView] = useState<boolean>(false);
  const [isAddCardModal, setIsAddCardModal] = useState<boolean>(false);

  const handlePinButton: (objIndex: number) => void = (objIndex) => {
    setPinnedList([...pinnedList, unpinnedList[objIndex]]);
    setUnpinnedList((prevList) =>
      prevList.filter((_obj, index) => index !== objIndex),
    );
  };

  const handleUnpinButton = (objIndex: number) => {
    const itemToUnpin = pinnedList[objIndex];
    setPinnedList((prevList) =>
      prevList.filter((_obj, index) => index !== objIndex),
    );

    const originalIndex = orderedList.findIndex(
      (item) => item.id === itemToUnpin.id,
    );

    setUnpinnedList((prevList) => {
      const newList = [...prevList];
      newList.splice(originalIndex, 0, itemToUnpin);
      return newList;
    });
  };

  const handleEditDeckName = () => {
    setIsEditDeckName(true);
  };

  const onChangeDeckName = (e: any) => {
    setDeckName(e.target.value);
  };

  const onSubmitDeckName = (e: any) => {
    e.preventDefault();
    setIsEditDeckName(false);
  };

  const handleAddCardButton = () => {
    setIsAddCardModal(true);
  };

  const handleTableViewToggle = () => {
    setIsListView(!isListView);
  };

  const onSubmitEditDeck = () => {};

  const handleEditCardButton = () => {};

  const handleDeleteCardButton = () => {};

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
      console.log(user);
    };
    fetchUser();
  }, []);

  const isAuth: boolean = user?.id === deckData?.user_uid;

  return (
    <div>
      <div className="mt-[1rem] flex justify-between" id="compare-list-header">
        <div className="flex items-center gap-[0.5rem]">
          {isEditDeckName ? (
            <form
              className="flex h-[2rem] gap-[1rem]"
              onSubmit={onSubmitDeckName}
            >
              <input
                className="w-[12rem] rounded-[0.375rem] border"
                type="text"
                value={deckName}
                onChange={onChangeDeckName}
              />
              <button
                className="rounded-[0.375rem] bg-[#2563eb] px-[0.5rem] py-[0.25rem] text-[0.75rem] text-white"
                type="submit"
              >
                Save
              </button>
            </form>
          ) : (
            <>
              <h2 className="text-[1.5rem] font-bold leading-[2rem]">
                {deckName}
              </h2>
              {user && user?.id === deckData?.user_uid ? (
                <button className="mx-[0.625rem]" onClick={handleEditDeckName}>
                  <Image
                    src={editIcon}
                    alt="edit icon"
                    height={20}
                    width={20}
                  />
                </button>
              ) : (
                ""
              )}
            </>
          )}
        </div>
        <ListViewButton
          isListView={isListView}
          handleTableViewToggle={handleTableViewToggle}
        />
      </div>
      {!isListView ? (
        <div
          className="mt-[1rem] flex rounded-[4px] bg-[#e0e0e0] p-[24px]"
          id="column-view-container"
        >
          <ul className="mb-[1rem] hidden sm:flex" id="category-names">
            <li>
              <div className="h-[2.5rem]" />
              <div
                className="h-[4rem] border-b border-b-[#c5c5c5] md:h-[6rem] xl:h-[8rem]"
                id="image-category"
              />
              <li className="border-b border-b-[#c5c5c5] p-[1rem] text-[0.875rem]">
                Name
              </li>
              <li className="border-b border-b-[#c5c5c5] p-[1rem] text-[0.875rem]">
                Brand
              </li>
              <li className="border-b border-b-[#c5c5c5] p-[1rem] text-[0.875rem]">
                Year
              </li>
              <li className="border-b border-b-[#c5c5c5] p-[1rem] text-[0.875rem]">
                Price
              </li>
              <li className="p-[1rem] text-[0.875rem]">Description</li>
            </li>
          </ul>
          <ul
            className="scrollbar-top flex w-full snap-x snap-mandatory list-none flex-row overflow-x-auto scroll-smooth pb-[1rem]"
            id="scroll-list"
          >
            {pinnedList.map((cardObj, cardIndex) => (
              <li
                className="w-1/3 flex-shrink-0 snap-start rounded-[0.25rem] hover:bg-gray-300 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[12.5%]"
                key={cardIndex}
                id="pinned-cards"
              >
                <button
                  className="flex w-full justify-center"
                  onClick={() => handleUnpinButton(cardIndex)}
                  id="unpin-button"
                >
                  <Image
                    className="m-[0.625rem] min-h-[1.25rem] min-w-[1.25rem]"
                    src={pinnedIcon}
                    alt="pinned icon"
                    height={20}
                    width={20}
                  />
                </button>
                <div
                  className="flex h-[4rem] w-full items-center justify-center border-b border-b-[#c5c5c5] bg-black md:h-[6rem] xl:h-[8rem]"
                  id="image-container"
                >
                  <img
                    className="w-full object-contain"
                    src={cardObj.imgUrl}
                    alt=""
                  />
                </div>
                <div
                  className="min-h-[3.375rem] border-b border-b-[#c5c5c5] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.name}
                </div>
                <div
                  className="min-h-[3.375rem] border-b border-b-[#c5c5c5] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.brand}
                </div>
                <div
                  className="min-h-[3.375rem] border-b border-b-[#c5c5c5] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.price}
                </div>
                <div
                  className="min-h-[3.375rem] border-b border-b-[#c5c5c5] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.year}
                </div>
                <div
                  className="min-h-[3.375rem] border-b border-b-[#c5c5c5] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.description}
                </div>
                <div className="flex justify-center gap-[1rem] p-[1rem] sm:gap-[2rem]">
                  <button onClick={() => handleEditCardButton()}>
                    <Image
                      src={editIcon}
                      alt="edit icon"
                      height={20}
                      width={20}
                    />
                  </button>
                  <button onClick={() => handleDeleteCardButton()}>
                    <Image
                      src={binIcon}
                      alt="delete icon"
                      height={20}
                      width={20}
                    />
                  </button>
                </div>
              </li>
            ))}
            {unpinnedList.map((cardObj, cardIndex) => (
              <li
                className="w-1/3 flex-shrink-0 snap-start rounded-[0.25rem] hover:bg-gray-300 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[12.5%]"
                key={cardIndex}
                id="unpinned-card"
              >
                <button
                  className="flex w-full justify-center"
                  onClick={() => handlePinButton(cardIndex)}
                >
                  <Image
                    className="m-[0.625rem]"
                    src={unpinIcon}
                    alt="pinned icon"
                    height={20}
                    width={20}
                  />
                </button>
                <div
                  className="flex h-[4rem] w-full items-center justify-center border-b border-b-[#c5c5c5] bg-black md:h-[6rem] xl:h-[8rem]"
                  id="image-container"
                >
                  <img
                    className="h-min w-full object-contain"
                    src={cardObj.imgUrl}
                    alt=""
                  />
                </div>
                <div
                  className="min-h-[3.375rem] overflow-x-auto whitespace-nowrap border-b border-b-[#c5c5c5] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.name}
                </div>
                <div
                  className="min-h-[3.375rem] border-b border-b-[#c5c5c5] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.brand}
                </div>
                <div
                  className="min-h-[3.375rem] border-b border-b-[#c5c5c5] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.price}
                </div>
                <div
                  className="min-h-[3.375rem] border-b border-b-[#c5c5c5] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.year}
                </div>
                <div
                  className="min-h-[3.375rem] overflow-y-auto border-b border-b-[#c5c5c5] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.description}
                </div>
                <div className="flex justify-center gap-[1rem] p-[1rem] sm:gap-[2rem]">
                  <button onClick={() => handleEditCardButton()}>
                    <Image
                      src={editIcon}
                      alt="edit icon"
                      height={20}
                      width={20}
                    />
                  </button>
                  <button onClick={() => handleDeleteCardButton()}>
                    <Image
                      src={binIcon}
                      alt="delete icon"
                      height={20}
                      width={20}
                    />
                  </button>
                </div>
              </li>
            ))}
            <li className="flex h-full w-1/3 flex-shrink-0 snap-start items-center justify-center rounded-[0.25rem] border border-[#c5c5c5] hover:bg-gray-300 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[12.5%]">
              <button
                className="h-full w-full text-[4rem] font-[400]"
                onClick={() => handleAddCardButton()}
              >
                <span>+</span>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div
          className="w-full overflow-x-auto p-[1rem]"
          id="table-view-container"
        >
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
                <th>action</th>
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
                  <td className="px-[1rem]">{cardIndex + 1}</td>
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
                  <td className="whitespace-nowrap px-[1rem]">
                    {cardObj.name}
                  </td>
                  <td className="whitespace-nowrap px-[1rem]">
                    {cardObj.brand}
                  </td>
                  <td className="whitespace-nowrap px-[1rem]">
                    {cardObj.year}
                  </td>
                  <td className="whitespace-nowrap px-[1rem]">
                    {cardObj.price}
                  </td>
                  <td className="whitespace-nowrap px-[1rem]">
                    <p>{cardObj.description}</p>
                  </td>
                  <td>
                    <div className="flex justify-center gap-mobile-spacing px-[1rem]">
                      <button>
                        <Image
                          src={editIcon}
                          alt="edit icon"
                          height={20}
                          width={20}
                        />
                      </button>
                      <button>
                        <Image
                          src={binIcon}
                          alt="bin icon"
                          height={20}
                          width={20}
                        />
                      </button>
                    </div>
                  </td>
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
                    {pinnedList.length + cardIndex + 1}
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
                  <td className="whitespace-nowrap px-[1rem]">
                    {cardObj.name}
                  </td>
                  <td className="whitespace-nowrap px-[1rem]">
                    {cardObj.brand}
                  </td>
                  <td className="whitespace-nowrap px-[1rem]">
                    {cardObj.year}
                  </td>
                  <td className="whitespace-nowrap px-[1rem]">
                    {cardObj.price}
                  </td>
                  <td className="whitespace-nowrap px-[1rem]">
                    <p>{cardObj.description}</p>
                  </td>
                  <td>
                    <div className="flex justify-center gap-mobile-spacing px-[1rem]">
                      <button>
                        <Image
                          className="min-h-[1.25rem] min-w-[1.25rem]"
                          src={editIcon}
                          alt="edit icon"
                          width={20}
                          height={20}
                        />
                      </button>
                      <button>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isAddCardModal && (
        <AddCardModal
          orderedList={pinnedList}
          unpinnedList={unpinnedList}
          setIsAddCardModal={setIsAddCardModal}
          setOrderedList={setOrderedList}
          setUnpinnedList={setUnpinnedList}
        />
      )}
    </div>
  );
};

export default CompareList;
