"use client";

import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, setUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Trigger the server-side logout function through the API route
      const response = await fetch("/api/logout", { method: "POST" });

      if (response.ok) {
        // Update the client-side user state to null
        setUser(null);

        // Redirect the user to the homepage after logout
        router.push("/");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
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
            <button className="hover:underline" onClick={handleLogout}>
              Logout
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

  return (
    <div className="max-w-full bg-white">
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
          {user && user.aud === "authenticated" ? (
            <UserLinks />
          ) : (
            <GuestLinks />
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
