"use client";

import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, setUser, signOut, fetchUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Sign out successful");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const NavLink: FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
  }) => (
    <Link href={href}>
      <div className="whitespace-nowrap hover:underline">{children}</div>
    </Link>
  );

  const GuestLinks: FC = () => (
    <NavLink href="/login">
      <span className="rounded-[.325rem] bg-blue px-[1rem] py-[0.5rem] font-[0.875rem] text-[white] hover:bg-[#426bc2]">
        Log in
      </span>
    </NavLink>
  );

  const UserLinks: FC = () => (
    <div className="group relative inline-block" ref={dropdownRef}>
      <button
        className="hover:underline"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        User
      </button>
      {isDropdownOpen && (
        <div
          className="absolute right-[2rem] top-[2rem] z-10 flex-col rounded-[.325rem] bg-gray-500 p-[1rem]"
          id="dropdown-card"
        >
          <div
            className="flex flex-col gap-[1rem]"
            onClick={() => setIsDropdownOpen(false)}
          >
            <NavLink href="/account">Account</NavLink>
            <NavLink href="/setting">Setting</NavLink>
            <button className="hover:underline" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );

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

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <header className="max-w-full bg-white">
      <div
        className="mx-mobile-spacing flex max-h-[3.25rem] items-center justify-between leading-[1.25rem] xl:mx-[1.5rem]"
        id="header"
      >
        <Link href={"/"}>
          <img
            className="h-[2.5rem]"
            src="https://thumbs.dreamstime.com/b/temporary-rubber-stamp-over-white-background-86664158.jpg"
            alt="logo"
          />
        </Link>
        <nav className="flex gap-[1.5rem] py-mobile-spacing font-[.875rem] font-medium">
          <NavLink href="/create-deck">Create Deck</NavLink>
          <NavLink href={"/decks"}>Browse</NavLink>
        </nav>
        <nav className="flex gap-[1.5rem] py-mobile-spacing font-[.875rem] font-medium">
          {user?.aud === "authenticated" ? (
            <UserLinks />
          ) : (
            user === undefined && <GuestLinks />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
