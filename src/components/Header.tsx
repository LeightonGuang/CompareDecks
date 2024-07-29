"use client";

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-white">
      <div className="flex mx-mobile-spacing xl:mx-[1.5rem] py-mobile-spacing justify-between items-center leading-[1.25rem]">
        <Link href={"/"}>
          <img
            className="h-mobile-spacing"
            src="https://thumbs.dreamstime.com/b/temporary-rubber-stamp-over-white-background-86664158.jpg"
            alt="logo"
          />
        </Link>
        <nav className="flex gap-[1.5rem] font-[.875rem] font-medium">
          <Link href={"/"}>Home</Link>
          <Link href={"/create-deck"}>Create Deck</Link>
          <Link href={"/decks"}>Browse</Link>
          {isLoggedIn ? (
            <>
              <Link href={"/setting"}>Setting</Link>
              <Link href={"/account"}>Account</Link>
            </>
          ) : (
            <Link href={"/login"}>Log in</Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
