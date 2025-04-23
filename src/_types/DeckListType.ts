// Type for list of decks page

import { DecksTableType } from "./DecksTableType";

export interface DeckListType extends DecksTableType {
  cards: { imgUrl: string }[];
}
