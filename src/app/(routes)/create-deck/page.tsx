"use client";

import { useState } from "react";
import CompareList from "@/components/compareList/CompareList";
import { useRouter } from "next/navigation";

import { DeckType } from "@/_types/DeckType";
import { useUser } from "@/context/UserContext";

const CreateDeckPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [deckData, setDeckData] = useState<DeckType | null>(null);

  if (user?.aud !== "authenticated") {
    router.push("/login");
  }

  return (
    <main className="h-dynamic-vh overflow-y-auto" id="create-deck-page">
      <div className="mx-mobile-spacing">
        <CompareList deckData={deckData} />
      </div>
    </main>
  );
};

export default CreateDeckPage;
