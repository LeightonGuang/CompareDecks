"use client";

import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

import userIcon from "../../../_assets/icons/userIcon.svg";
import { useRouter } from "next/navigation";

const AccountPage = () => {
  const { user, isLoading, fetchUser } = useUser();
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  useEffect(() => {
    fetchUser;
  }, []);

  return (
    <>
      {!isLoading && (
        <main
          className="flex h-dynamic-vh items-center justify-center"
          id="account-page"
        >
          {!isLoading && (
            <div
              className="border-[#E2E8F0 rounded-[0.5rem] border px-[1rem] py-[2rem]"
              id="account-page-card"
            >
              <h1 className="text-[1.5rem] font-[700]">Account</h1>
              <div className="text-center">
                <Image
                  className="mx-auto mt-[1.5rem] h-[4rem] w-[4rem]"
                  src={userIcon}
                  alt="user icon"
                />
                <div
                  className="mt-[1.5rem] flex flex-col gap-[0.5rem]"
                  id="user-info"
                >
                  <h2 className="text-[1.5rem] font-[700]">
                    {user?.user_metadata.name}
                  </h2>
                  <p className="text-[1rem] text-[#5e6d8c]">{user?.email}</p>
                  <p className="text-[1rem] text-[#5e6d8c]">
                    User ID: {user?.id}
                  </p>
                </div>
                <div className="mt-[2rem] flex gap-[0.5rem] text-[0.875rem] font-[500]">
                  <button className="rounded-[0.375rem] border border-[#E2E8F0] px-[1rem] py-[0.5rem]">
                    Change Name
                  </button>
                  <button className="rounded-[0.375rem] border border-[#E2E8F0] px-[1rem] py-[0.5rem]">
                    Change Password
                  </button>
                  <button className="rounded-[0.375rem] bg-[#DC2828] px-[1rem] py-[0.5rem] text-white">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default AccountPage;
