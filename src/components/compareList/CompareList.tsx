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
          <ul className="mb-[1rem] hidden md:flex" id="category-names">
            <li>
              <div className="h-[2.5rem]" />
              <div className="xl:max-h[10rem] h-[6rem] border border-b-[#d1d1d1] md:h-[10rem]" />
              <li className="border border-b-[#d1d1d1] p-[1rem] text-[0.875rem]">
                Name
              </li>
              <li className="border border-b-[#d1d1d1] p-[1rem] text-[0.875rem]">
                Brand
              </li>
              <li className="border border-b-[#d1d1d1] p-[1rem] text-[0.875rem]">
                Year
              </li>
              <li className="border border-b-[#d1d1d1] p-[1rem] text-[0.875rem]">
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
                className="w-1/2 flex-shrink-0 snap-start rounded-[0.25rem] hover:bg-gray-300 md:w-1/4 xl:w-1/5"
                key={cardIndex}
                id="pinned-cards"
              >
                <button
                  className="flex w-full justify-center"
                  onClick={() => handleUnpinButton(cardIndex)}
                  id="unpin-button"
                >
                  <Image
                    className="m-[0.625rem]"
                    src={pinnedIcon}
                    alt="pinned icon"
                    height={20}
                    width={20}
                  />
                </button>
                <div
                  className="xl:max-h[10rem] flex h-[6rem] w-full justify-center border border-b-[#d1d1d1] md:h-[10rem]"
                  id="image-container"
                >
                  <img
                    className="h-full w-full object-contain p-[0.5rem]"
                    src={cardObj.imgUrl}
                    alt=""
                  />
                </div>

                <div
                  className="border border-b-[#d1d1d1] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.name}
                </div>
                <div
                  className="border border-b-[#d1d1d1] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.brand}
                </div>
                <div
                  className="border border-b-[#d1d1d1] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.price}
                </div>
                <div
                  className="border border-b-[#d1d1d1] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.year}
                </div>
                <div
                  className="border border-b-[#d1d1d1] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.description}
                </div>
                <div className="flex justify-between border border-b-[#d1d1d1] p-[1rem]">
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
                className="w-1/2 flex-shrink-0 snap-start rounded-[0.25rem] hover:bg-gray-300 md:w-1/4 xl:w-1/5"
                key={cardIndex}
                id="compare-card"
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
                  className="xl:max-h[10rem] flex h-[6rem] w-full justify-center border border-b-[#d1d1d1] md:h-[10rem]"
                  id="image-container"
                >
                  <img
                    className="h-full w-full object-contain p-[0.5rem]"
                    src={cardObj.imgUrl}
                    alt=""
                  />
                </div>

                <div
                  className="border border-b-[#d1d1d1] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.name}
                </div>
                <div
                  className="border border-b-[#d1d1d1] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.brand}
                </div>
                <div
                  className="border border-b-[#d1d1d1] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.price}
                </div>
                <div
                  className="border border-b-[#d1d1d1] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.year}
                </div>
                <div
                  className="border border-b-[#d1d1d1] py-[1rem] text-center text-[0.875rem] font-[400]"
                  id="row"
                >
                  {cardObj.description}
                </div>
                <div className="flex justify-between p-[1rem]">
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
          </ul>
        </div>
      ) : (
        <div className="w-full overflow-x-auto p-[1rem]" id="table-container">
          <table className="w-full">
            <thead className="text-center">
              <tr>
                <th></th>
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Year</th>
                <th>Price</th>
                <th>Description</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody className="">
              {pinnedList.map((cardObj, cardIndex) => (
                <tr
                  className={`max-h-[3rem] ${
                    (pinnedList.length + cardIndex) % 2 === 0
                      ? `bg-gray-200`
                      : ``
                  }`}
                  key={cardIndex}
                >
                  <td className="px-[1rem]">{cardIndex + 1}</td>
                  <td className="px-[1rem]">
                    <button onClick={() => handleUnpinButton(cardIndex)}>
                      Unpin
                    </button>
                  </td>
                  <td className="px-[1rem]">
                    <img
                      className="aspect-16/9 max-h-[3rem] max-w-[5rem] object-contain"
                      src={cardObj.imgUrl}
                      alt={cardObj.brand + " " + cardObj.name}
                    />
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
                    <p className="whitespace-nowrap px-[1rem]">
                      {cardObj.description}
                    </p>
                  </td>
                  <td>
                    <div className="flex gap-mobile-spacing px-[1rem]">
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {unpinnedList.map((cardObj, cardIndex) => (
                <tr
                  className={`max-h-[3rem] ${
                    (pinnedList.length + cardIndex) % 2 === 0
                      ? `bg-gray-200`
                      : ``
                  }`}
                  key={cardIndex}
                >
                  <td className="px-[1rem]">
                    {pinnedList.length + cardIndex + 1}
                  </td>
                  <td className="px-[1rem]">
                    <button onClick={() => handlePinButton(cardIndex)}>
                      Pin
                    </button>
                  </td>
                  <td className="px-[1rem]">
                    <img
                      className="aspect-16/9 max-h-[3rem] max-w-[5rem] object-contain"
                      src={cardObj.imgUrl}
                      alt={cardObj.brand + " " + cardObj.name}
                    />
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
                    <p className="whitespace-nowrap px-[1rem]">
                      {cardObj.description}
                    </p>
                  </td>
                  <td>
                    <div className="flex gap-mobile-spacing px-[1rem]">
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompareList;
