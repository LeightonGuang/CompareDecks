"use client";

import { logout } from "@/app/logout/actions";
import getUser from "@/utils/getUser";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const Header = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  const NavLink: FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
  }) => (
    <Link href={href}>
      <div className="whitespace-nowrap hover:underline">{children}</div>
    </Link>
  );

  const GuestLinks: FC = () => <NavLink href="/login">Log in</NavLink>;

  const UserLinks: FC = () => (
    <div className="group relative inline-block">
      <button className="hover:underline">Account</button>
      <div
        className="absolute right-0 top-[2rem] z-10 hidden flex-col group-focus-within:block"
        id="dropdown-card"
      >
        <div className="flex flex-col gap-[1rem]">
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

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <div className="max-w-full bg-white">
      {isLoading ? (
        ``
      ) : (
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
      )}
    </div>
  );
};

export default Header;
