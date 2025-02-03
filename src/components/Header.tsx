"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useEffect, useRef, useState } from "react";

import gridIcon from "../_assets/icons/gridIcon.svg";
import userIcon from "../_assets/icons/userIcon.svg";
import settingIcon from "../_assets/icons/settingIcon.svg";
import signoutIcon from "../_assets/icons/signoutIcon.svg";

const Header = () => {
  const router = useRouter();
  const { user, signOut, fetchUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      fetchUser();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link href={href}>
      <div className="whitespace-nowrap">{children}</div>
    </Link>
  );

  const UserDropdown = () => {
    const UserLinks = () => (
      <div className="group relative inline-block" ref={dropdownRef}>
        <button
          className="text-[0.875rem] font-[500] text-[#020812] hover:underline"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {user.user_metadata.name
            ? user.user_metadata.name
            : user.email.split("@")[0]}
        </button>
        {isDropdownOpen && (
          <div
            className="absolute right-[0.1rem] top-[2rem] z-10 min-w-[8rem] flex-col rounded-[0.375rem] border-[1px] border-[#ECE8F0] bg-white p-[0.25rem] text-[0.875rem] text-[#020812] shadow-md"
            id="dropdown-card"
          >
            <div
              className="flex flex-col"
              onClick={() => setIsDropdownOpen(false)}
            >
              <NavLink href="/my-decks">
                <div className="flex items-center gap-[0.5rem] rounded-[0.125rem] px-[0.5rem] py-[0.375rem] transition duration-[0.2s] hover:bg-gray-100">
                  <Image
                    className="h-[1rem] w-[1rem]"
                    src={gridIcon}
                    alt="grid icon"
                  />
                  <p>My Decks</p>
                </div>
              </NavLink>
              <NavLink href="/account">
                <div className="flex items-center gap-[0.5rem] rounded-[0.125rem] px-[0.5rem] py-[0.375rem] transition duration-[0.2s] hover:bg-gray-100">
                  <Image
                    className="h-[1rem] w-[1rem]"
                    src={userIcon}
                    alt="user icon"
                  />
                  <p>Account</p>
                </div>
              </NavLink>
              <NavLink href="/setting">
                <div className="flex items-center gap-[0.5rem] rounded-[0.125rem] px-[0.5rem] py-[0.375rem] transition duration-[0.2s] hover:bg-gray-100">
                  <Image
                    className="h-[1rem] w-[1rem]"
                    src={settingIcon}
                    alt={"setting icon"}
                  />
                  <p>Setting</p>
                </div>
              </NavLink>
              <div className="mx-[-0.25rem] my-[0.25rem] border-b-[1px] border-[#ECE8F0]" />
              <button onClick={handleSignOut}>
                <div className="flex items-center gap-[0.5rem] rounded-[0.125rem] px-[0.5rem] py-[0.375rem] transition duration-[0.2s] hover:bg-gray-100">
                  <Image
                    className="h-[1rem] w-[1rem]"
                    src={signoutIcon}
                    alt={"signout icon"}
                  />
                  <p>Sign out</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    );

    const GuestLinks = () => (
      <NavLink href="/login">
        <span className="rounded-[.325rem] bg-blue px-[1rem] py-[0.5rem] font-[0.875rem] text-[white] hover:bg-[#426bc2]">
          Log in
        </span>
      </NavLink>
    );

    return (
      <nav className="flex gap-[1.5rem] py-mobile-spacing font-medium">
        {user?.aud === "authenticated" ? (
          <UserLinks />
        ) : (
          user === undefined && <GuestLinks />
        )}
      </nav>
    );
  };

  const NavLinks = () => {
    return (
      <nav className="flex gap-[1.5rem] py-mobile-spacing text-[0.875rem] font-[500] text-[#020812]">
        <NavLink href="/create-deck">
          <div className="hover:underline">Create Deck</div>
        </NavLink>

        <NavLink href={"/decks"}>
          <div className="hover:underline">Browse</div>
        </NavLink>
      </nav>
    );
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="max-w-full border-b border-b-gray-400 bg-white">
      <div
        className="mx-mobile-spacing flex max-h-[3.25rem] items-center justify-between leading-[1.25rem] xl:mx-[2rem]"
        id="header"
      >
        <Link href={"/"}>
          <div className="text-3xl font-bold text-sky-600">CD</div>
        </Link>

        <NavLinks />

        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;
