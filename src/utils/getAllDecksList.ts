export const getAllDecksList = async () => {
  try {
    const response = await fetch("/api/DeckContext/getAllDecksList");
    if (!response.ok) {
      throw new Error("Failed to fetch decks");
    }

    const { allDecksList, error } = await response.json();

    if (error) {
      console.error("error from response", error);
      return;
    } else if (!error) {
      return allDecksList;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
