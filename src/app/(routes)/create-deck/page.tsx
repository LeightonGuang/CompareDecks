"use client";

import { useEffect, useState } from "react";
import CompareList from "@/components/compareList/CompareList";
import { useRouter } from "next/navigation";

import { DeckType } from "@/_types/DeckType";
import { useUser } from "@/context/UserContext";

const CreateDeckPage = () => {
  const router = useRouter();
  const { user, isLoading, fetchUser } = useUser();
  const [deckData, setDeckData] = useState<DeckType | null>(null);

  if (user === undefined && !isLoading) {
    router.push("/");
  }

  const handleCreateDeckButton = async () => {
    // TODO: Create deck
    console.log("Create deck button clicked");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main className="h-dynamic-vh overflow-y-auto" id="create-deck-page">
      <div className="mx-mobile-spacing">
        <CompareList deckData={deckData} />
        <button
          className="rounded-full bg-green-500 px-[0.5rem] py-[0.25rem] text-[0.75rem] text-[#f2f5fc]"
          onClick={handleCreateDeckButton}
        >
          Create
        </button>
      </div>
    </main>
  );
};

export default CreateDeckPage;
