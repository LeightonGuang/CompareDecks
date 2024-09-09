"use client";

import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

const MyDecksPage = () => {
  const { fetchUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser();
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <main className="h-dynamic-vh overflow-y-auto" id="my-deck-page">
          <div className="mx-mobile-spacing">
            <h1>My Decks</h1>
          </div>
        </main>
      )}
    </>
  );
};

export default MyDecksPage;
