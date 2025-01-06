import { CardTableType } from "./CardsTableType";

// type for decks

export interface DecksTableType {
  id: number;
  name: string;
  user_uid: string;
  uuid: string;
  cards: CardTableType[];
  created_at: string;
  edited_at: string;
}
