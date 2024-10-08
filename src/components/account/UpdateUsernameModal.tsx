"use client";

import { ChangeEvent, useState } from "react";
import { useUser } from "@/context/UserContext";

interface Props {
  setShowUpdateUsernameModal: (arg0: boolean) => void;
}

const UpdateUsernameModal = ({ setShowUpdateUsernameModal }: Props) => {
  const { updateUsername } = useUser();
  const [username, setUsername] = useState<string>("");

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmitUsernameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await updateUsername(username);
    if (response.success) {
      setShowUpdateUsernameModal(false);
      window.location.reload();
    } else if (!response.success) {
      console.error(response.message);
    }
  };

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      id="change-username-modal"
    >
      <div
        className="w-[16rem] rounded-[0.375rem] bg-white md:w-[28rem]"
        id="change-username-card"
      >
        <div className="m-[1rem]">
          <div className="mb-[1rem] flex items-center justify-between">
            <h1>Update Username</h1>
            <button
              className="rounded-[0.25rem] bg-red-300 px-[0.5rem] py-[0.25rem] text-[0.75rem] text-red-500"
              onClick={() => setShowUpdateUsernameModal(false)}
            >
              Close
            </button>
          </div>
          <form
            className="flex flex-col gap-[1rem]"
            onSubmit={handleSubmitUsernameChange}
          >
            <input
              className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
              name="newUsername"
              type="text"
              placeholder="New Username"
              value={username}
              onChange={onUsernameChange}
            />

            <button
              className="rounded-[0.375rem] bg-green-500 px-[1rem] py-[0.5rem] text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUsernameModal;
