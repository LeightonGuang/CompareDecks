"use client";

import { logout } from "@/app/logout/actions";
import Link from "next/link";
import { FC } from "react";
import { useUser } from "@/context/UserContext";

const Header = () => {
  const { user, isLoading } = useUser();

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
      <span className="mr-[1rem] rounded-[.325rem] bg-blue px-[1rem] py-[0.5rem] font-[0.875rem] text-[white] hover:bg-[#426bc2]">
        Log in
      </span>
    </NavLink>
  );

  const UserLinks: FC = () => (
    <div className="group relative inline-block">
      <button className="hover:underline">User</button>
      <div
        className="absolute right-[-1rem] top-[2rem] z-10 hidden flex-col rounded-[.325rem] bg-gray-500 group-focus-within:block"
        id="dropdown-card"
      >
        <div className="flex flex-col gap-[1rem] p-[1rem]">
          <NavLink href="/account">Account</NavLink>
          <NavLink href="/setting">Setting</NavLink>
          <form action={logout}>
            <button className="hover:underline" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );

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
