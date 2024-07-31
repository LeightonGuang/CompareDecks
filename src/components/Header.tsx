"use client";

import { logout } from "@/app/logout/actions";
import getUser from "@/utils/getUser";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="bg-white">
      <div className="flex mx-mobile-spacing xl:mx-[1.5rem] justify-between items-center leading-[1.25rem]">
        <Link href={"/"}>
          <img
            className="h-[2.5rem]"
            src="https://thumbs.dreamstime.com/b/temporary-rubber-stamp-over-white-background-86664158.jpg"
            alt="logo"
          />
        </Link>
        <nav className="flex gap-[1.5rem] py-mobile-spacing font-[.875rem] font-medium">
          <Link href={"/"}>Home</Link>
          <Link href={"/create-deck"}>Create Deck</Link>
          <Link href={"/decks"}>Browse</Link>
          {user && user.aud === "authenticated" ? (
            <>
              <Link href={"/setting"}>Setting</Link>
              <Link href={"/account"}>Account</Link>
              <form action={logout}>
                <button type="submit">Logout</button>
              </form>
            </>
          ) : (
            <>
              <Link href={"/login"}>Log in</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
