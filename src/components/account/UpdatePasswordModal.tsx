"use client";

import { useUser } from "@/context/UserContext";
import { useState } from "react";

interface Props {
  setShowUpdatePasswordModal: (arg0: boolean) => void;
}

const UpdatePasswordModal = ({ setShowUpdatePasswordModal }: Props) => {
  const { updatePassword } = useUser();
  const [currentPasswordError, setCurrentyPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState({
    hasEmptyPasswordError: false,
    hasWhiteSpaceError: false,
    hasAlphaNumericError: false,
    isPasswordLengthError: false,
  });
  const [isPasswordUpdateSuccess, setIsPasswordUpdateSuccess] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleSubmitPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // reset current password error
    setCurrentyPasswordError("");
    setNewPasswordError({
      hasEmptyPasswordError: false,
      hasWhiteSpaceError: false,
      hasAlphaNumericError: false,
      isPasswordLengthError: false,
    });
    const response = await updatePassword(
      passwordForm.currentPassword,
      passwordForm.newPassword,
    );
    const responseData = await response;
    console.log("responseData", responseData);

    if (!responseData.success) {
      if (responseData.error === "Invalid login credentials") {
        setCurrentyPasswordError("Incorrect password. Please try again.");
      }
      if (typeof responseData.error === "object") {
        setNewPasswordError(responseData.error);
      }
    } else if (responseData.success) {
      setIsPasswordUpdateSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      id="change-password-modal"
    >
      <div
        className="w-[16rem] rounded-[0.375rem] bg-white md:w-[28rem]"
        id="change-password-card"
      >
        <div>
          <div className="m-[1rem]">
            <div className="mb-[1rem] flex items-center justify-between">
              <h1>Update Password</h1>
              <button
                className="rounded-[0.25rem] bg-red-300 px-[0.5rem] py-[0.25rem] text-[0.75rem] text-red-500"
                onClick={() => setShowUpdatePasswordModal(false)}
              >
                Close
              </button>
            </div>
            <form
              className="flex flex-col gap-[1rem]"
              onSubmit={handleSubmitPasswordChange}
            >
              <input
                className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
                name="currentPassword"
                type="password"
                placeholder="Current Password"
                value={passwordForm.currentPassword}
                onChange={onPasswordChange}
              />
              {currentPasswordError && (
                <label className="text-[0.75rem] text-red-500">
                  {currentPasswordError}
                </label>
              )}
              <input
                className="w-full rounded-[0.375rem] border border-[#E4E4EB] p-[0.5rem] leading-[1.375rem]"
                name="newPassword"
                type="password"
                placeholder="New Password"
                value={passwordForm.newPassword}
                onChange={onPasswordChange}
              />
              {Object.values(newPasswordError).some(
                (bool) => bool === true,
              ) && (
                <ul className="list-disc pl-[1rem]">
                  {newPasswordError.hasEmptyPasswordError && (
                    <li className="text-[0.75rem] text-red-500">
                      Password cannot be empty
                    </li>
                  )}
                  {newPasswordError.hasWhiteSpaceError && (
                    <li className="text-[0.75rem] text-red-500">
                      Password cannot have white space
                    </li>
                  )}
                  {newPasswordError.hasAlphaNumericError && (
                    <li className="text-[0.75rem] text-red-500">
                      Password must contain at least one letter and one number
                      (eg. abcd1234)
                    </li>
                  )}
                  {newPasswordError.isPasswordLengthError && (
                    <li className="text-[0.75rem] text-red-500">
                      Password must contain at least 8 characters
                    </li>
                  )}
                </ul>
              )}
              {isPasswordUpdateSuccess && (
                <label className="text-[0.75rem] text-green-500">
                  Password updated successfully
                </label>
              )}
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
    </div>
  );
};

export default UpdatePasswordModal;
